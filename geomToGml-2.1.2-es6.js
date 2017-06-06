/* Convert geojson into gml 2.1.2 simple features.
 GML models from https://docs.oracle.com/cd/E11882_01/appdev.112/e11829/oracle/spatial/util/GML.html
 */
/**
 * returns a string with the first letter capitalized.
 * @function 
 * @private 
 * @param {string} str
 * @returns {string} a string with the first letter capitalized.
 */
function capitalizeFirstLetter(str){
  return str.replace(/^./, (letter)=>letter.toUpperCase());
}
/**
 * returns a string with the first letter lowered.
 * @function 
 * @private 
 * @param {string} str
 * @returns {string} a string with the first letter lowered.
 */
function lowerFirstLetter(str){
  return str.replace(/^./, (letter)=>letter.toLowerCase());
}
/** 
 * converts a geojson geometry Point to gml
 * @function 
 * @param {number[]} coords the coordinates member of the geometry
 * @param {string|undefined} srsName a string specifying SRS
 * @returns {string} a string of gml describing the input geometry
 */
function Point(coords, srsName){
  return `<gml:Point${(srsName ? ` srsName="${srsName}"` : '')}>` +
    '<gml:coordinates cs="," ts=" " decimal=".">' +
    coords.join() +
    '</gml:coordinates>' +
    '</gml:Point>';
}
/**
 * converts a geojson geometry LineString to gml
 * @function 
 * @param {number[][]} coords the coordinates member of the geometry
 * @param {string|undefined} srsName a string specifying SRS
 * @returns {string} a string of gml describing the input geometry
 */
function LineString(coords, srsName){
  return `<gml:LineString${(srsName ? ` srsName="${srsName}"`:'')}>` +
    '<gml:coordinates cs="," ts=" " decimal=".">' +
    coords.join(' ') +
    '</gml:coordinates>' +
    '</gml:LineString>';
}
/**
 * converts a geojson geometry ring in a polygon to gml
 * @function 
 * @param {number[][]} coords the coordinates member of the geometry
 * @param {string|undefined} srsName a string specifying SRS
 * @returns {string} a string of gml describing the input geometry
 */
function LinearRing(coords, srsName){
  return `<gml:LinearRing${(srsName ? ` srsName="${srsName}"`:'')}>` +
    '<gml:coordinates cs="," ts=" " decimal=".">' +
    coords.join(' ') + 
    '</gml:coordinates>' +
    '</gml:LinearRing>';
}
/**
 * converts a geojson geometry Polygon to gml
 * @function 
 * @param {number[][][]} coords the coordinates member of the geometry
 * @param {string|undefined} srsName a string specifying SRS
 * @returns {string} a string of gml describing the input geometry
 */
function Polygon(coords, srsName){
  // geom.coordinates are arrays of LinearRings
  let polygon = `<gml:Polygon${(srsName ? ` srsName="${srsName}"`:'')}>` +
	'<gml:outerBoundaryIs>' +
	LinearRing(coords[0]) +
	'</gml:outerBoundaryIs>';
  if (coords.length >= 2){
    for (let linearRing of coords.slice(1)){
      polygon += '<gml:innerBoundaryIs>' +
	LinearRing(linearRing) + 
	'</gml:innerBoundaryIs>';
    }
  }
  polygon += '</gml:Polygon>';
  return polygon;
}
/**
 * Handles multigeometries or geometry collections
 * @function
 * @param {Object} geom a geojson geometry object
 * @param {string} name the name of the multigeometry, e.g. 'MultiPolygon'
 * @param {string|undefined} srsName a string specifying the SRS
 * @param {string} memberPrefix the prefix of a gml member tag
 * @returns {string} a string of gml describing the input multigeometry
 * @throws {Error} will throw an error if a member geometry is supplied without a `type` attribute
 */
function _multi(geom, name, cb, srsName, memberPrefix=''){
  let multi = `<gml:${name}${(srsName ? ` srsName="${srsName}"` : '')}>`;
  let isAMultiGeometry = geom.type === 'MutliGeometry';
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
      (isAMultiGeometry ? cb[_memberPrefix] : cb)(member, srsName='') +
      `</gml:${memberPrefix}Member>`;
  }
  multi += `</gml:${name}>`;
  return multi;
}
/**
 * converts a geojson geometry MultiPoint to gml
 * @function 
 * @param {number[][]} coords the coordinates member of the geometry
 * @param {string|undefined} srsName a string specifying SRS
 * @returns {string} a string of gml describing the input geometry
 * @see _multi
 * @see Point
 */
function MultiPoint(coords, srsName){
  return _multi(coords, 'MultiPoint', Point, srsName, 'point');
}
/**
 * converts a geojson geometry MultiLineString to gml
 * @function 
 * @param {number[][][]} coords the coordinates member of the geometry
 * @param {string|undefined} srsName a string specifying SRS
 * @returns {string} a string of gml describing the input geometry
 * @see _multi
 * @see LineString
 */
function MultiLineString(coords, srsName){
  return _multi(coords, 'MultiLineString', LineString, srsName, 'lineString');
}
/**
 * converts a geojson geometry MultiPolygon to gml
 * @function 
 * @param {number[][][][]} coords the coordinates member of the geometry
 * @param {string|undefined} srsName a string specifying SRS
 * @returns {string} a string of gml describing the input geometry
 * @see _multi
 * @see Polygon
 */
function MultiPolygon(coords, srsName){
  return _multi(coords, 'MultiPolygon', Polygon, srsName, 'polygon');
}
const converter = {
  Point, LineString, LinearRing, Polygon,
  MultiPoint, MultiLineString, MultiPolygon, GeometryCollection
};
/**
 * converts a geojson geometry GeometryCollection to gml MultiGeometry
 * @function 
 * @param {Object[]} geoms an array of geojson geometry objects
 * @param {string|undefined} srsName a string specifying SRS
 * @returns {string} a string of gml describing the input GeometryCollection
 * @see _multi
 */
function GeometryCollection(geoms, srsName){
  return _multi(geoms, 'MultiGeometry', ()=>"", srsName, 'geometry');
};

/**
 * Translate geojson to gml 2.1.2 for any geojson geometry type
 * @function 
 * @param {Object} geom a geojson geometry object
 * @param {string|undefined} srsName a string specifying SRS
 * @returns {string} a string of gml describing the input geometry
 */
function geomToGml(geom, srsName='EPSG:4326'){
  return converter[geom.type](geom.coordinates || geom.geometries, srsName);
}
/** exports a function to convert geojson geometries to gml 2.1.2 */
export {
  geomToGml, Point, LineString, LinearRing, Polygon,
  MultiPoint, MultiLineString, MultiPolygon, GeometryCollection
};
