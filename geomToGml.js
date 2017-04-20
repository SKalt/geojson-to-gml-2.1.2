/* DISCLAIMER: gml 2.1.2-compliant only
This hack only supports GML simple features.
GML models from https://docs.oracle.com/cd/E11882_01/appdev.112/e11829/oracle/spatial/util/GML.html

 */
/**
 * returns a string with the first letter capitalized.
 * @param {string} str
 * @returns {string} a string with the first letter capitalized.
 */
function capitalizeFirstLetter(str){
    return str.replace(/^./, (letter)=>letter.toUpperCase());
}
/**
 * returns a string with the first letter lowered.
 * @param {string} str
 * @returns {string} a string with the first letter lowered.
 */
function lowerFirstLetter(str){
    return str.replace(/^./, (letter)=>letter.toLowerCase());
}
var converter = {
    /**
     * converts a geojson geometry Point to gml
     * @param {number[]} coords the coordinates member of the geometry
     * @param {string|undefined} srsName a string specifying SRS
     * @returns {string} a string of gml describing the input geometry
     */
    'Point': function(coords, srsName){
	return `<gml:Point${(srsName ? ` srsName="${srsName}"` : '')}>` +
	         '<gml:coordinates cs="," ts=" " decimal=".">' +
	               coords.join() +
	         '</gml:coordinates>' +
	    '</gml:Point>';
    },
    /**
     * converts a geojson geometry LineString to gml
     * @param {number[][]} coords the coordinates member of the geometry
     * @param {string|undefined} srsName a string specifying SRS
     * @returns {string} a string of gml describing the input geometry
     */
    'LineString': function(coords, srsName){
	return `<gml:LineString${(srsName ? ` srsName="${srsName}"`:'')}>` +
	          '<gml:coordinates cs="," ts=" " decimal=".">' +
	              coords.join(' ') +
	          '</gml:coordinates>' +
	       '</gml:LineString>';
    },
    /**
     * converts a geojson geometry ring in a polygon to gml
     * @param {number[][]} coords the coordinates member of the geometry
     * @param {string|undefined} srsName a string specifying SRS
     * @returns {string} a string of gml describing the input geometry
     */
    'LinearRing': function(coords, srsName){
	return `<gml:LinearRing${(srsName ? ` srsName="${srsName}"`:'')}>` +
	          '<gml:coordinates cs="," ts=" " decimal=".">' +
	            coords.join(' ') + 
	          '</gml:coordinates>' +
	       '</gml:LinearRing>';
    },
    /**
     * converts a geojson geometry Point to gml
     * @param {number[][][]} coords the coordinates member of the geometry
     * @param {string|undefined} srsName a string specifying SRS
     * @returns {string} a string of gml describing the input geometry
     */
    'Polygon': function(coords, srsName){
	// geom.coordinates are arrays of LinearRings
	let polygon = `<gml:Polygon${(srsName ? ` srsName="${srsName}"`:'')}>` +
		     '<gml:outerBoundaryIs>' +
		        this.LinearRing(coords[0]) +
	             '</gml:outerBoundaryIs>';
	if (coords.length >= 2){
	    for (let linearRing of coords.slice(1)){
		polygon += '<gml:innerBoundaryIs>' +
		             this.LinearRing(linearRing) + 
		           '</gml:innerBoundaryIs>';
	    }
	}
	polygon += '</gml:Polygon>';
	return polygon;
    },
    /**
     * Handles multigeometries
     * @param {Object} geom a geojson geometry object
     * @param {string} name the name of the multigeometry, e.g. 'MultiPolygon'
     * @param {string|undefined} srsName a string specifying the SRS
     * @param {string} memberPrefix the prefix of a gml member tag
     * @returns {string} a string of gml describing the input multigeometry
     * @throws {} TODO******
     */
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
    /**
     * converts a geojson geometry MultiPoint to gml
     * @param {number[][]} coords the coordinates member of the geometry
     * @param {string|undefined} srsName a string specifying SRS
     * @returns {string} a string of gml describing the input geometry
     */
    'MultiPoint': function(coords, srsName){
	return this._multi(coords, 'MultiPoint', srsName, 'point');
    },
    /**
     * converts a geojson geometry MultiLineString to gml
     * @param {number[][][]} coords the coordinates member of the geometry
     * @param {string|undefined} srsName a string specifying SRS
     * @returns {string} a string of gml describing the input geometry
     */
    'MultiLineString': function(coords, srsName){
	return this._multi(coords, 'MultiLineString', srsName, 'lineString');
    },
    /**
     * converts a geojson geometry MultiPolygon to gml
     * @param {number[][][][]} coords the coordinates member of the geometry
     * @param {string|undefined} srsName a string specifying SRS
     * @returns {string} a string of gml describing the input geometry
     */
    'MultiPolygon': function(coords, srsName){
	return this._multi(coords, 'MultiPolygon', srsName, 'polygon');
    },
    /**
     * converts a geojson geometry GeometryCollection to gml MultiGeometry
     * @param {Object[]} geoms an array of geojson geometry objects
     * @param {string|undefined} srsName a string specifying SRS
     * @returns {} a string of gml describing the input GeometryCollection
     */
    'GeometryCollection': function(geoms, srsName){
	return this._multi(geoms, 'MultiGeometry', srsName, 'geometry');
    }
};

/**
 * Translate geojson to gml 2.1.2 for any geojson geometry type
 * @param {Object} geom a geojson geometry object
 * @param {string|undefined} srsName a string specifying SRS
 * @returns {string} a string of gml describing the input geometry
 */
function geomToGml(geom, srsName='EPSG:4326'){
    return converter[geom.type](geom.coordinates || geom.geometries, srsName);
}

exports.geomToGml = geomToGml;
