// from http://geojson.org/geojson-spec.html#examples
var gml = require('./geomToGml-2.1.2.js').geomToGml;
var assert = require('assert');
var validate = require('xsd-schema-validator').validateXML;

function addNs(xml){
    var xmlns = ` xmlns:gml="http://www.opengis.net/gml"`;
    var index = />/.exec(xml).index;
    return xml.substr(0, index) + xmlns + xml.substr(index);
}

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

function validateGml(xml, xsd){
    return new Promise(function(resolve, reject){
	validate(xml, 'gml.xsd', function(err, result){
	    if (err) reject(err);
	    resolve(result);
	});
    });
}

describe('geomToGml-2.1.2', function(){
    describe('visual inspection', function(){
	it('should look right, or at least visible', function(){
	    [point, line, polygon, multipoint,
	     multilinestring, multipolygon, geometrycollection].map(
		 (e)=>console.log(addNs(gml2(e)), '\n------------------------\n')
	     );
	});
    });
    describe('validation tests', function(){
	it('Point', function(){
	    var xml = addNs(gml(point));
	    return validateGml(xml);
	});
	it('LineString', function(){
	    var xml = addNs(gml(line));
	    return validateGml(xml);
	});
	it('Polygon', function(){
	    var xml = addNs(gml(polygon));
	    return validateGml(xml);
	});
	it('MultiPoint', function(){
	    var xml = addNs(gml(multipoint));
	    return validateGml(xml);
	});
	it('MultiPolygon', function(){
	    var xml = addNs(gml(multipolygon));
	    return validateGml(xml);
	});
	it('MultiLineString', function(){
	    var xml = addNs(gml(multilinestring));
	    return validateGml(xml);
	});
	it('GeometryCollection', function(){
	    var xml = addNs(gml(geometrycollection));
	    return validateGml(xml);
	});
	
    });
});
