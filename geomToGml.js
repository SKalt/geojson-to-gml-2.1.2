/* DISCLAIMER: gml 2.1.2-compliant only
This hack only supports GML simple features.
GML models from https://docs.oracle.com/cd/E11882_01/appdev.112/e11829/oracle/spatial/util/GML.html

 */
function capitalizeFirstLetter(str){
    return str.replace(/^./, (letter)=>letter.toUpperCase());
}
function lowerFirstLetter(str){
    return str.replace(/^./, (letter)=>letter.toLowerCase());
}
var converter = {
    'Point': function(coords, srsName){
	return `<gml:Point${(srsName ? ` srsName="${srsName}"` : '')}>` +
	         '<gml:coordinates cs="," ts=" " decimal=".">' +
	               coords.join() +
	         '</gml:coordinates>' +
	       '</gml:Point>';
    },
    'LineString': function(coords, srsName){
	return `<gml:LineString${(srsName ? ` srsName="${srsName}"`:'')}>` +
	          '<gml:coordinates>' +
	              coords.join(' ') +
	          '</gml:coordinates>' +
	       '</gml:LineString>';
    },
    'LinearRing': function(coords, srsName){
	return `<gml:LinearRing${(srsName ? ` srsName="${srsName}"`:'')}>` +
	          '<gml:coordinates>' +
	            coords.join(' ') + 
	          '</gml:coordinates>' +
	       '</gml:LinearRing>';
    },
    'Polygon': function(coords, srsName){
	// geom.coordinates are arrays of LinearRings
	let polygon = `<gml:Polygon${(srsName ? ` srsName="${srsName}"`:'')}>` +
		     '<gml:OuterBoundaryIs>' +
		        this.LinearRing(coords[0]) +
	             '</gml:OuterBoundaryIs>';
	if (coords.length >= 2){
	    for (let linearRing of coords.slice(1)){
		polygon += '<gml:InnerBoundaryIs>' +
		             this.LinearRing(linearRing) + 
		           '</gml:InnerBoundaryIs>';
	    }
	}
	polygon += '</gml:Polygon>';
	return polygon;
    },
    '_multi': function(geom, name, srsName, memberPrefix=''){
	let multi = `<gml:${name}${(srsName ? ` srsName="${srsName}"` : '')}>`;
	for (let member of geom){
	    var _memberPrefix = '';
	    if (member.type){
		// geometryCollection: memberPrefix should be '',
		memberPrefix = lowerFirstLetter(member.type);
		member = member.coordinates;
	    }
	    if (!memberPrefix){
		throw 'un-typed member ' + JSON.stringify(member);
	    } else {
		_memberPrefix = capitalizeFirstLetter(memberPrefix);
	    }
	    multi += `<gml:${memberPrefix}Member>` +
		converter[_memberPrefix](member, srsName='') +
		`</gml:${memberPrefix}Member>`;
	}
	multi += `</gml:${name}>`;
	return multi;
    },
    'MultiPoint': function(coords, srsName){
	return this._multi(coords, 'Point', srsName, 'point');
    },
    'MultiLineString': function(coords, srsName){
	return this._multi(coords, 'MultiLineString', srsName, 'lineString');
    },
    'MultiPolygon': function(coords, srsName){
	return this._multi(coords, 'MultiPolygon', srsName, 'polygon');
    },
    'GeometryCollection': function(geoms, srsName){
	return this._multi(geoms, 'GeometryCollection', srsName);
    }
};
// TODO: gml v3.x.x converter
// TODO: setup tests with PostGIS point, lineString, polygon, & multi-*.
function geomToGml(geom, srsName='EPSG:4326'){
    // TODO: switch between gml versions
    return converter[geom.type](geom.coordinates || geom.geometries, srsName);
 
}

exports.geomToGml = geomToGml;
