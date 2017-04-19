// from http://geojson.org/geojson-spec.html#examples
var gml2 = require('./geomToGml.js').geomToGml;
var gml3 = require('./geomToGml3.js').geomToGml;
var assert = require('assert');
var validate = require('../wfs_validator/validator.js').validate;

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
	    var xml = addNs(gml2(point));
	    return validate(xml, 'gml', '2.1.2');
	});
	it('LineString', function(){
	    var xml = addNs(gml2(line));
	    return validate(xml, 'gml', '2.1.2');
	});
	it('Polygon', function(){
	    var xml = addNs(gml2(polygon));
	    return validate(xml, 'gml', '2.1.2');
	});
	it('MultiPoint', function(){
	    var xml = addNs(gml2(multipoint));
	    return validate(xml, 'gml', '2.1.2');
	});
	it('MultiPolygon', function(){
	    var xml = addNs(gml2(multipolygon));
	    return validate(xml, 'gml', '2.1.2');
	});
	it('MultiLineString', function(){
	    var xml = addNs(gml2(multilinestring));
	    return validate(xml, 'gml', '2.1.2');
	});
	it('GeometryCollection', function(){
	    var xml = addNs(gml2(geometrycollection));
	    return validate(xml, 'gml', '2.1.2');
	});
	
    });
});

function addNs3(xml){
    var xmlns = ` xmlns:gml="http://www.opengis.net/gml/3.2"`;
    var index = />/.exec(xml).index;
    return xml.substr(0, index) + xmlns + xml.substr(index);
}

describe('geomToGml-3.2.1', function(){
    describe('visual inspection', function(){
	it('should look right, or at least visible', function(){
	    [point, line, polygon, multipoint,
	     multilinestring, multipolygon, geometrycollection].map(
		 (e)=>console.log(addNs3(gml3(e, 'ab.1')), '\n------------------------\n')
	     );
	});
    });
    describe('validation tests', function(){
	it('Point', function(){
	    var xml = addNs3(gml3(point, 'ab.1'));
	    return validate(xml, 'gml', '3.2.1');
	});
	it('LineString', function(){
	    var xml = addNs3(gml3(line, 'ab.1'));
	    return validate(xml, 'gml', '3.2.1');
	});
	it('Polygon', function(){
	    var xml = addNs3(gml3(polygon, 'ab.1'));
	    return validate(xml, 'gml', '3.2.1');
	});
	it('MultiPoint', function(){
	    var xml = addNs3(gml3(multipoint,'ab.0', {gmlIds:['ab.1', 'cd.2']}));
	    return validate(xml, 'gml', '3.2.1');
	});
	it('MultiLineString', function(){
	    var xml = addNs3(gml3(multilinestring,'ab.0', {gmlIds:['ab.1', 'cd.2']}));
	    return validate(xml, 'gml', '3.2.1');
	});
	it('MultiPolygon', function(){
	    var xml = addNs3(gml3(multipolygon,'ab.0', {gmlIds:['ab.1', 'cd.2']}));
	    return validate(xml, 'gml', '3.2.1');
	});
	it('GeometryCollecion', function(){
	    var xml = addNs3(gml3(geometrycollection, 'ab.0', {gmlIds:['ab.1', 'cd.2']}));
	    return validate(xml, 'gml', '3.2.1');
	});
    });
});
