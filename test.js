// from http://geojson.org/geojson-spec.html#examples
var geomToGml = require('./geomToGml.js').geomToGml;
var gml3 = require('./geomToGml3').geomToGml;
var xml = require('libxmljs');
var assert = require('assert');
var request = require('request');
var wfs = require('./geojsonToWfst').makeWfstConverter();
// create geojson examples
var point =  {"type": "Point", "coordinates": [102.0, 0.5]};
var line = {
          "type": "LineString",
          "coordinates": [
            [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
            ]
          };
var polygon = {
           "type": "Polygon",
           "coordinates": [
             [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
               [100.0, 1.0], [100.0, 0.0] ]
             ]
};
//http://geojson.org/geojson-spec.html#id5
var multipoint = {
    "type": "MultiPoint",
    "coordinates": [ [100.0, 0.0], [101.0, 1.0] ]
};
// http://geojson.org/geojson-spec.html#id6
var multilinestring =  {
    "type": "MultiLineString",
    "coordinates": [
        [ [100.0, 0.0], [101.0, 1.0] ],
        [ [102.0, 2.0], [103.0, 3.0] ]
      ]
};
//http://geojson.org/geojson-spec.html#id7
var multipolygon = {
    "type": "MultiPolygon",
    "coordinates": [
	[
	    [
		[102.0, 2.0],
		[103.0, 2.0],
		[103.0, 3.0],
		[102.0, 3.0],
		[102.0, 2.0]
	    ]
	],
	[
	    [
		[100.0, 0.0],
		[101.0, 0.0],
		[101.0, 1.0],
		[100.0, 1.0],
		[100.0, 0.0]
	    ],
	    [
		[100.2, 0.2],
		[100.8, 0.2],
		[100.8, 0.8],
		[100.2, 0.8],
		[100.2, 0.2]
	    ]
	]
    ]
};
//http://geojson.org/geojson-spec.html#geometrycollection
var geometrycollection = {
    "type": "GeometryCollection",
    "geometries": [
	{ "type": "Point",
          "coordinates": [100.0, 0.0]
        },
	{ "type": "LineString",
          "coordinates": [ [101.0, 0.0], [102.0, 1.0] ]
        }
    ]
};
function toFeature(geom){
    return {type:'feature', id:'1', 'geometry':geom};
};
// use mocha.js testing
describe('geomToGml()', function(){
    describe('#geomToGml(Point)', function(){
	it('should return a valid xml string', function(){
	    xml.parseXml(geomToGml(point));
	});
    });
    describe('#geomToGml(LineString)', function(){
	it('should return a valid xml string', function(){
	    xml.parseXml(geomToGml(line));
	});
    });
    describe('#geomToGml(Polygon)', function(){
	it('should return a valid xml string', function(){
	    xml.parseXml(geomToGml(polygon));
	});
    });
    describe('#geomToGml(MultiPoint)', function(){
	it('should return a valid xml string', function(){
	    xml.parseXml(geomToGml(multipoint));
	});
    });
    describe('#geomToGml(MultiLineString)', function(){
	it('should return a valid xml string', function(){
	    xml.parseXml(geomToGml(multilinestring));
	});
    });
    describe('#geomToGml(MultiPolygon)', function(){
	it('should return a valid xml string', function(){
	    xml.parseXml(geomToGml(multipolygon));
	});
    });
    describe('#geomToGml(GeometryCollection)', function(){
	it('should return a valid xml string', function(){
	    xml.parseXml(geomToGml(geometrycollection));
	});
    });
});

// for wfst-1
describe('geojsonToWfst()', function(){
    describe('.insert', function(){
	it('should return a valid xml string', function(){
	    let doc = xml.parseXml(
		wfs.insert(
		    toFeature(point),
		    'topp',
		    'tasmania_roads',
		    geomColumn='the_geom',
		    fieldValues={'TYPE':'Rainbow'}
		)
	    );
	    doc.errors.forEach(
		function(e){
		    if (!/^Namespace prefix/.exec(e.message)){
			// an unexpected non-namespace error
			throw e;
		    }
		}
	    );
	});
    });
    describe('.update', function(){
	it('should return a valid xml string', function(){
	    let doc = xml.parseXml(
		wfs.update(
		    toFeature(point),'topp', 'tasmania_roads',
		    {'TYPE':'Rainbow'}
		)
	    );
	    doc.errors.forEach(
		function(e){
		    if (!/^Namespace prefix/.exec(e.message)){
			// an unexpected non-namespace error
			e.message += '\n' + doc.text();
			throw e ;
		    }
		}
	    );
	});
    });
    describe('.delete', function(){
	it('should return a valid xml string', function(){
	    let doc = xml.parseXml(
		wfs.delete(
		    // mock feature
		    {id:'tasmania_roads.15'}, 'topp', 'tasmania_roads'
		)
	    );
	    doc.errors.forEach(
		function(e){
		    if (!/^Namespace prefix/.exec(e.message)){
			// an unexpected non-namespace error
			e.message += '\n' + doc.text();
			throw e ;
		    }
		}
	    );
	});
    });
    describe('.transaction', function(){
	it('should return a valid xml string', function(){
	    console.log(wfs.transaction());
	    let doc = xml.parseXml(
		wfs.transaction()
	    );
	    doc.errors.forEach(
		function(e){
		    if (!/^Namespace prefix/.exec(e.message)){
			// an unexpected non-namespace error
			e.message += '\n' + doc.text();
			throw e ;
		    }
		}
	    );
	});
    });
});

describe('server_actions', function(){
    const post = function(xml, cb){
	request.post({
	    'url':'http://localhost:8080/geoserver/wfs',
	    'body': xml,
	    'headers': {'Content-Type': 'text/xml'}
	}, function(err, resp, body){cb(err, resp, body);});
    };
    it('should be able to ping the server', function(){
	let url ='http://localhost:8080/geoserver/ows?SERVICE=WFS' +
		'&REQUEST=GetCapabilities';
	request.get(url, function(err, resp, body){
	    assert.equal(resp.statusCode, 200);
	});
    });
    describe('.insert', function(){
	it('should be able to insert a feature without errors', function(){
	    return new Promise(
		function(res, rej){
		    post(
			wfs.transaction(
			    [
				wfs.insert(
				    {
					id:'tasmania_roads.15',
					geometry:{
					    "type": "MultiLineString",
					    "coordinates": [
						[
						    [-41.1716, 146.1036],
						    [-41.1716, -41.2372],
						    [146.3036, -41.2372]
						]
					    ]
					},
					properties: {
					    TYPE: 'Rainbow'
					}
				    },
				    'topp', 'tasmania_roads', 'the_geom'
				)
			    ],
			    namespaceAssignments={
				'topp':'http://www.openplans.org/topp'
			    },
			    schemaLocations={
				'http://www.openplans.org/topp':'http://localhost:8080/geoserver/wfs/DescribeFeatureType?typename=topp:tasmania_roads'
			    }
			),
			function(err, response, body){
			    if (err){
				throw err;
			    }
			    if (response.statusCode != 200){
				throw new Error(
				    'non-200 status code ' +
					response.statusCode
				);
			    }
			    let doc = xml.parseXml(body);
			    let success = doc.get(
				'//wfs:SUCCESS',
				{wfs: 'http://www.opengis.net/wfs'}
			    );
			    if (!success){
				throw new Error(
				    'Unsucessful post' + doc.toString()
				);
				rej();
			    }
			    res(doc.toString());
			}
		    );
		});
	});
	    
	it('should be able to successfully insert a feature', function(){
	    return new Promise(
		function(res, rej){
		    request.get(
			`http://localhost:8080/geoserver/wfs?` +
			    `service=WFS&version=2.0.0` +
			    `&request=GetFeature` +
			    `&typenames=topp:tasmania_roads` +
			    `&outputFormat=application/json`,
			function(err, response, body){
			    if (err){
				throw err;
			    }
			    let geojson = JSON.parse(body);
			    let feature = geojson.features[14];
			    if (!feature){
				throw new Error('feature not found ' + body);
			    } else if (!feature.properties.TYPE == 'Rainbow'){
				throw new Error('feature not found ' + body);
			    }
			    res(body);
			}
		    );
		}
	    );
	});
	it('should be able to update said feature', function(){
	    return new Promise(
		function(res, rej){
		    post(
			wfs.transaction(
			    [
				wfs.insert(
				    {
					id:'tasmania_roads.15',
					geometry:{
					    "type": "MultiLineString",
					    "coordinates": [
						[
						    [-41.1716, 146.1036],
						    [-41.1716, -41.2372],
						    [146.3036, -41.2372]
						]
					    ]
					},
					properties: {
					    TYPE: 'Rainbow'
					}
				    },
				    'topp', 'tasmania_roads', 'the_geom'
				)
			    ],
			    namespaceAssignments={
				'topp':'http://www.openplans.org/topp'
			    },
			    schemaLocations={
				'http://www.openplans.org/topp':'http://localhost:8080/geoserver/wfs/DescribeFeatureType?typename=topp:tasmania_roads'
			    }
			),
			function(err, response, body){
			    if (err){
				throw err;
			    }
			    if (response.statusCode != 200){
				throw new Error(
				    'non-200 status code ' +
					response.statusCode
				);
			    }
			    let doc = xml.parseXml(body);
			    let success = doc.get(
				'//wfs:SUCCESS',
				{wfs: 'http://www.opengis.net/wfs'}
			    );
			    if (!success){
				throw new Error(
				    'Unsucessful post' + doc.toString()
				);
				rej();
			    }
			    res(doc.toString());
			}
		    );
		});
	});
	});
	it('should be able to see these updates', function(){
	    throw 'TODO';
	});
	it('should be able to delete a feature', function(){
	    throw 'TODO';
	});
	it('should no longer be able to see the feature', function(){
	    throw 'TODO';
	});
    });
});

// gml3 tests
// use mocha.js testing
describe('geomToGml()', function(){
    describe('#geomToGml(Point)', function(){
	it('should return a valid xml string', function(){
	    xml.parseXml(gml3(point));
	});
    });
    describe('#geomToGml(LineString)', function(){
	it('should return a valid xml string', function(){
	    xml.parseXml(gml3(line));
	});
    });
    describe('#geomToGml(Polygon)', function(){
	it('should return a valid xml string', function(){
	    xml.parseXml(gml3(polygon));
	});
    });
    describe('#geomToGml(MultiPoint)', function(){
	it('should return a valid xml string', function(){
	    xml.parseXml(gml3(multipoint));
	});
    });
    describe('#geomToGml(MultiLineString)', function(){
	it('should return a valid xml string', function(){
	    xml.parseXml(gml3(multilinestring));
	});
    });
    describe('#geomToGml(MultiPolygon)', function(){
	it('should return a valid xml string', function(){
	    xml.parseXml(gml3(multipolygon));
	});
    });
    describe('#geomToGml(GeometryCollection)', function(){
	it('should return a valid xml string', function(){
	    xml.parseXml(gml3(geometrycollection));
	});
    });
});
