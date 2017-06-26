'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
function capitalizeFirstLetter(str) {
  return str.replace(/^./, letter => letter.toUpperCase());
}
/**
 * returns a string with the first letter lowered.
 * @function 
 * @private 
 * @param {string} str
 * @returns {string} a string with the first letter lowered.
 */
function lowerFirstLetter(str) {
  return str.replace(/^./, letter => letter.toLowerCase());
}
/** 
 * converts a geojson geometry Point to gml
 * @function 
 * @param {number[]} coords the coordinates member of the geometry
 * @param {string|undefined} srsName a string specifying SRS
 * @returns {string} a string of gml describing the input geometry
 */
function Point(coords, srsName) {
  return `<gml:Point${srsName ? ` srsName="${srsName}"` : ''}>` + '<gml:coordinates cs="," ts=" " decimal=".">' + coords.join() + '</gml:coordinates>' + '</gml:Point>';
}
/**
 * converts a geojson geometry LineString to gml
 * @function 
 * @param {number[][]} coords the coordinates member of the geometry
 * @param {string|undefined} srsName a string specifying SRS
 * @returns {string} a string of gml describing the input geometry
 */
function LineString(coords, srsName) {
  return `<gml:LineString${srsName ? ` srsName="${srsName}"` : ''}>` + '<gml:coordinates cs="," ts=" " decimal=".">' + coords.join(' ') + '</gml:coordinates>' + '</gml:LineString>';
}
/**
 * converts a geojson geometry ring in a polygon to gml
 * @function 
 * @param {number[][]} coords the coordinates member of the geometry
 * @param {string|undefined} srsName a string specifying SRS
 * @returns {string} a string of gml describing the input geometry
 */
function LinearRing(coords, srsName) {
  return `<gml:LinearRing${srsName ? ` srsName="${srsName}"` : ''}>` + '<gml:coordinates cs="," ts=" " decimal=".">' + coords.join(' ') + '</gml:coordinates>' + '</gml:LinearRing>';
}
/**
 * converts a geojson geometry Polygon to gml
 * @function 
 * @param {number[][][]} coords the coordinates member of the geometry
 * @param {string|undefined} srsName a string specifying SRS
 * @returns {string} a string of gml describing the input geometry
 */
function Polygon(coords, srsName) {
  // geom.coordinates are arrays of LinearRings
  let polygon = `<gml:Polygon${srsName ? ` srsName="${srsName}"` : ''}>` + '<gml:outerBoundaryIs>' + LinearRing(coords[0]) + '</gml:outerBoundaryIs>';
  if (coords.length >= 2) {
    for (let linearRing of coords.slice(1)) {
      polygon += '<gml:innerBoundaryIs>' + LinearRing(linearRing) + '</gml:innerBoundaryIs>';
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
function _multi(geom, name, cb, srsName, memberPrefix = '') {
  let multi = `<gml:${name}${srsName ? ` srsName="${srsName}"` : ''}>`;
  for (let member of geom) {
    var _memberPrefix = '';
    if (member.type) {
      // geometryCollection: memberPrefix should be '',
      memberPrefix = lowerFirstLetter(member.type);
      member = member.coordinates;
    }
    if (!memberPrefix) {
      throw 'un-typed member ' + JSON.stringify(member);
    } else {
      _memberPrefix = capitalizeFirstLetter(memberPrefix);
    }
    let inner = (cb[_memberPrefix] || cb)(member, srsName = '');
    multi += `<gml:${memberPrefix}Member>${inner}</gml:${memberPrefix}Member>`;
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
function MultiPoint(coords, srsName) {
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
function MultiLineString(coords, srsName) {
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
function MultiPolygon(coords, srsName) {
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
function GeometryCollection(geoms, srsName) {
  return _multi(geoms, 'MultiGeometry', converter, srsName, 'geometry');
}

/**
 * Translate geojson to gml 2.1.2 for any geojson geometry type
 * @function 
 * @param {Object} geom a geojson geometry object
 * @param {string|undefined} srsName a string specifying SRS
 * @returns {string} a string of gml describing the input geometry
 */
function geomToGml(geom, srsName = 'EPSG:4326') {
  return converter[geom.type](geom.coordinates || geom.geometries, srsName);
}

exports.geomToGml = geomToGml;
exports.Point = Point;
exports.LineString = LineString;
exports.LinearRing = LinearRing;
exports.Polygon = Polygon;
exports.MultiPoint = MultiPoint;
exports.MultiLineString = MultiLineString;
exports.MultiPolygon = MultiPolygon;
exports.GeometryCollection = GeometryCollection;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbVRvR21sLTIuMS4yLWNqcy5qcyIsInNvdXJjZXMiOlsiZ2VvbVRvR21sLTIuMS4yLWVzNi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb252ZXJ0IGdlb2pzb24gaW50byBnbWwgMi4xLjIgc2ltcGxlIGZlYXR1cmVzLlxuIEdNTCBtb2RlbHMgZnJvbSBodHRwczovL2RvY3Mub3JhY2xlLmNvbS9jZC9FMTE4ODJfMDEvYXBwZGV2LjExMi9lMTE4Mjkvb3JhY2xlL3NwYXRpYWwvdXRpbC9HTUwuaHRtbFxuICovXG4vKipcbiAqIHJldHVybnMgYSBzdHJpbmcgd2l0aCB0aGUgZmlyc3QgbGV0dGVyIGNhcGl0YWxpemVkLlxuICogQGZ1bmN0aW9uIFxuICogQHByaXZhdGUgXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBhIHN0cmluZyB3aXRoIHRoZSBmaXJzdCBsZXR0ZXIgY2FwaXRhbGl6ZWQuXG4gKi9cbmZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcihzdHIpe1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL14uLywgKGxldHRlcikgPT4gbGV0dGVyLnRvVXBwZXJDYXNlKCkpO1xufVxuLyoqXG4gKiByZXR1cm5zIGEgc3RyaW5nIHdpdGggdGhlIGZpcnN0IGxldHRlciBsb3dlcmVkLlxuICogQGZ1bmN0aW9uIFxuICogQHByaXZhdGUgXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBhIHN0cmluZyB3aXRoIHRoZSBmaXJzdCBsZXR0ZXIgbG93ZXJlZC5cbiAqL1xuZnVuY3Rpb24gbG93ZXJGaXJzdExldHRlcihzdHIpe1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL14uLywgKGxldHRlcik9PmxldHRlci50b0xvd2VyQ2FzZSgpKTtcbn1cbi8qKiBcbiAqIGNvbnZlcnRzIGEgZ2VvanNvbiBnZW9tZXRyeSBQb2ludCB0byBnbWxcbiAqIEBmdW5jdGlvbiBcbiAqIEBwYXJhbSB7bnVtYmVyW119IGNvb3JkcyB0aGUgY29vcmRpbmF0ZXMgbWVtYmVyIG9mIHRoZSBnZW9tZXRyeVxuICogQHBhcmFtIHtzdHJpbmd8dW5kZWZpbmVkfSBzcnNOYW1lIGEgc3RyaW5nIHNwZWNpZnlpbmcgU1JTXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBhIHN0cmluZyBvZiBnbWwgZGVzY3JpYmluZyB0aGUgaW5wdXQgZ2VvbWV0cnlcbiAqL1xuZnVuY3Rpb24gUG9pbnQoY29vcmRzLCBzcnNOYW1lKXtcbiAgcmV0dXJuIGA8Z21sOlBvaW50JHsoc3JzTmFtZSA/IGAgc3JzTmFtZT1cIiR7c3JzTmFtZX1cImAgOiAnJyl9PmAgK1xuICAgICc8Z21sOmNvb3JkaW5hdGVzIGNzPVwiLFwiIHRzPVwiIFwiIGRlY2ltYWw9XCIuXCI+JyArXG4gICAgY29vcmRzLmpvaW4oKSArXG4gICAgJzwvZ21sOmNvb3JkaW5hdGVzPicgK1xuICAgICc8L2dtbDpQb2ludD4nO1xufVxuLyoqXG4gKiBjb252ZXJ0cyBhIGdlb2pzb24gZ2VvbWV0cnkgTGluZVN0cmluZyB0byBnbWxcbiAqIEBmdW5jdGlvbiBcbiAqIEBwYXJhbSB7bnVtYmVyW11bXX0gY29vcmRzIHRoZSBjb29yZGluYXRlcyBtZW1iZXIgb2YgdGhlIGdlb21ldHJ5XG4gKiBAcGFyYW0ge3N0cmluZ3x1bmRlZmluZWR9IHNyc05hbWUgYSBzdHJpbmcgc3BlY2lmeWluZyBTUlNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGEgc3RyaW5nIG9mIGdtbCBkZXNjcmliaW5nIHRoZSBpbnB1dCBnZW9tZXRyeVxuICovXG5mdW5jdGlvbiBMaW5lU3RyaW5nKGNvb3Jkcywgc3JzTmFtZSl7XG4gIHJldHVybiBgPGdtbDpMaW5lU3RyaW5nJHsoc3JzTmFtZSA/IGAgc3JzTmFtZT1cIiR7c3JzTmFtZX1cImA6JycpfT5gICtcbiAgICAnPGdtbDpjb29yZGluYXRlcyBjcz1cIixcIiB0cz1cIiBcIiBkZWNpbWFsPVwiLlwiPicgK1xuICAgIGNvb3Jkcy5qb2luKCcgJykgK1xuICAgICc8L2dtbDpjb29yZGluYXRlcz4nICtcbiAgICAnPC9nbWw6TGluZVN0cmluZz4nO1xufVxuLyoqXG4gKiBjb252ZXJ0cyBhIGdlb2pzb24gZ2VvbWV0cnkgcmluZyBpbiBhIHBvbHlnb24gdG8gZ21sXG4gKiBAZnVuY3Rpb24gXG4gKiBAcGFyYW0ge251bWJlcltdW119IGNvb3JkcyB0aGUgY29vcmRpbmF0ZXMgbWVtYmVyIG9mIHRoZSBnZW9tZXRyeVxuICogQHBhcmFtIHtzdHJpbmd8dW5kZWZpbmVkfSBzcnNOYW1lIGEgc3RyaW5nIHNwZWNpZnlpbmcgU1JTXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBhIHN0cmluZyBvZiBnbWwgZGVzY3JpYmluZyB0aGUgaW5wdXQgZ2VvbWV0cnlcbiAqL1xuZnVuY3Rpb24gTGluZWFyUmluZyhjb29yZHMsIHNyc05hbWUpe1xuICByZXR1cm4gYDxnbWw6TGluZWFyUmluZyR7KHNyc05hbWUgPyBgIHNyc05hbWU9XCIke3Nyc05hbWV9XCJgOicnKX0+YCArXG4gICAgJzxnbWw6Y29vcmRpbmF0ZXMgY3M9XCIsXCIgdHM9XCIgXCIgZGVjaW1hbD1cIi5cIj4nICtcbiAgICBjb29yZHMuam9pbignICcpICsgXG4gICAgJzwvZ21sOmNvb3JkaW5hdGVzPicgK1xuICAgICc8L2dtbDpMaW5lYXJSaW5nPic7XG59XG4vKipcbiAqIGNvbnZlcnRzIGEgZ2VvanNvbiBnZW9tZXRyeSBQb2x5Z29uIHRvIGdtbFxuICogQGZ1bmN0aW9uIFxuICogQHBhcmFtIHtudW1iZXJbXVtdW119IGNvb3JkcyB0aGUgY29vcmRpbmF0ZXMgbWVtYmVyIG9mIHRoZSBnZW9tZXRyeVxuICogQHBhcmFtIHtzdHJpbmd8dW5kZWZpbmVkfSBzcnNOYW1lIGEgc3RyaW5nIHNwZWNpZnlpbmcgU1JTXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBhIHN0cmluZyBvZiBnbWwgZGVzY3JpYmluZyB0aGUgaW5wdXQgZ2VvbWV0cnlcbiAqL1xuZnVuY3Rpb24gUG9seWdvbihjb29yZHMsIHNyc05hbWUpe1xuICAvLyBnZW9tLmNvb3JkaW5hdGVzIGFyZSBhcnJheXMgb2YgTGluZWFyUmluZ3NcbiAgbGV0IHBvbHlnb24gPSBgPGdtbDpQb2x5Z29uJHsoc3JzTmFtZSA/IGAgc3JzTmFtZT1cIiR7c3JzTmFtZX1cImA6JycpfT5gICtcblx0JzxnbWw6b3V0ZXJCb3VuZGFyeUlzPicgK1xuXHRMaW5lYXJSaW5nKGNvb3Jkc1swXSkgK1xuXHQnPC9nbWw6b3V0ZXJCb3VuZGFyeUlzPic7XG4gIGlmIChjb29yZHMubGVuZ3RoID49IDIpe1xuICAgIGZvciAobGV0IGxpbmVhclJpbmcgb2YgY29vcmRzLnNsaWNlKDEpKXtcbiAgICAgIHBvbHlnb24gKz0gJzxnbWw6aW5uZXJCb3VuZGFyeUlzPicgK1xuXHRMaW5lYXJSaW5nKGxpbmVhclJpbmcpICsgXG5cdCc8L2dtbDppbm5lckJvdW5kYXJ5SXM+JztcbiAgICB9XG4gIH1cbiAgcG9seWdvbiArPSAnPC9nbWw6UG9seWdvbj4nO1xuICByZXR1cm4gcG9seWdvbjtcbn1cbi8qKlxuICogSGFuZGxlcyBtdWx0aWdlb21ldHJpZXMgb3IgZ2VvbWV0cnkgY29sbGVjdGlvbnNcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IGdlb20gYSBnZW9qc29uIGdlb21ldHJ5IG9iamVjdFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGhlIG5hbWUgb2YgdGhlIG11bHRpZ2VvbWV0cnksIGUuZy4gJ011bHRpUG9seWdvbidcbiAqIEBwYXJhbSB7c3RyaW5nfHVuZGVmaW5lZH0gc3JzTmFtZSBhIHN0cmluZyBzcGVjaWZ5aW5nIHRoZSBTUlNcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZW1iZXJQcmVmaXggdGhlIHByZWZpeCBvZiBhIGdtbCBtZW1iZXIgdGFnXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBhIHN0cmluZyBvZiBnbWwgZGVzY3JpYmluZyB0aGUgaW5wdXQgbXVsdGlnZW9tZXRyeVxuICogQHRocm93cyB7RXJyb3J9IHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgYSBtZW1iZXIgZ2VvbWV0cnkgaXMgc3VwcGxpZWQgd2l0aG91dCBhIGB0eXBlYCBhdHRyaWJ1dGVcbiAqL1xuZnVuY3Rpb24gX211bHRpKGdlb20sIG5hbWUsIGNiLCBzcnNOYW1lLCBtZW1iZXJQcmVmaXg9Jycpe1xuICBsZXQgbXVsdGkgPSBgPGdtbDoke25hbWV9JHsoc3JzTmFtZSA/IGAgc3JzTmFtZT1cIiR7c3JzTmFtZX1cImAgOiAnJyl9PmA7XG4gIGZvciAobGV0IG1lbWJlciBvZiBnZW9tKXtcbiAgICB2YXIgX21lbWJlclByZWZpeCA9ICcnO1xuICAgIGlmIChtZW1iZXIudHlwZSl7XG4gICAgICAvLyBnZW9tZXRyeUNvbGxlY3Rpb246IG1lbWJlclByZWZpeCBzaG91bGQgYmUgJycsXG4gICAgICBtZW1iZXJQcmVmaXggPSBsb3dlckZpcnN0TGV0dGVyKG1lbWJlci50eXBlKTtcbiAgICAgIG1lbWJlciA9IG1lbWJlci5jb29yZGluYXRlcztcbiAgICB9XG4gICAgaWYgKCFtZW1iZXJQcmVmaXgpe1xuICAgICAgdGhyb3cgJ3VuLXR5cGVkIG1lbWJlciAnICsgSlNPTi5zdHJpbmdpZnkobWVtYmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX21lbWJlclByZWZpeCA9IGNhcGl0YWxpemVGaXJzdExldHRlcihtZW1iZXJQcmVmaXgpO1xuICAgIH1cbiAgICBsZXQgaW5uZXIgPSAoY2JbX21lbWJlclByZWZpeF0gfHwgY2IpKG1lbWJlciwgc3JzTmFtZT0nJyk7XG4gICAgbXVsdGkgKz0gYDxnbWw6JHttZW1iZXJQcmVmaXh9TWVtYmVyPiR7aW5uZXJ9PC9nbWw6JHttZW1iZXJQcmVmaXh9TWVtYmVyPmA7XG4gIH1cbiAgbXVsdGkgKz0gYDwvZ21sOiR7bmFtZX0+YDtcbiAgcmV0dXJuIG11bHRpO1xufVxuLyoqXG4gKiBjb252ZXJ0cyBhIGdlb2pzb24gZ2VvbWV0cnkgTXVsdGlQb2ludCB0byBnbWxcbiAqIEBmdW5jdGlvbiBcbiAqIEBwYXJhbSB7bnVtYmVyW11bXX0gY29vcmRzIHRoZSBjb29yZGluYXRlcyBtZW1iZXIgb2YgdGhlIGdlb21ldHJ5XG4gKiBAcGFyYW0ge3N0cmluZ3x1bmRlZmluZWR9IHNyc05hbWUgYSBzdHJpbmcgc3BlY2lmeWluZyBTUlNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGEgc3RyaW5nIG9mIGdtbCBkZXNjcmliaW5nIHRoZSBpbnB1dCBnZW9tZXRyeVxuICogQHNlZSBfbXVsdGlcbiAqIEBzZWUgUG9pbnRcbiAqL1xuZnVuY3Rpb24gTXVsdGlQb2ludChjb29yZHMsIHNyc05hbWUpe1xuICByZXR1cm4gX211bHRpKGNvb3JkcywgJ011bHRpUG9pbnQnLCBQb2ludCwgc3JzTmFtZSwgJ3BvaW50Jyk7XG59XG4vKipcbiAqIGNvbnZlcnRzIGEgZ2VvanNvbiBnZW9tZXRyeSBNdWx0aUxpbmVTdHJpbmcgdG8gZ21sXG4gKiBAZnVuY3Rpb24gXG4gKiBAcGFyYW0ge251bWJlcltdW11bXX0gY29vcmRzIHRoZSBjb29yZGluYXRlcyBtZW1iZXIgb2YgdGhlIGdlb21ldHJ5XG4gKiBAcGFyYW0ge3N0cmluZ3x1bmRlZmluZWR9IHNyc05hbWUgYSBzdHJpbmcgc3BlY2lmeWluZyBTUlNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGEgc3RyaW5nIG9mIGdtbCBkZXNjcmliaW5nIHRoZSBpbnB1dCBnZW9tZXRyeVxuICogQHNlZSBfbXVsdGlcbiAqIEBzZWUgTGluZVN0cmluZ1xuICovXG5mdW5jdGlvbiBNdWx0aUxpbmVTdHJpbmcoY29vcmRzLCBzcnNOYW1lKXtcbiAgcmV0dXJuIF9tdWx0aShjb29yZHMsICdNdWx0aUxpbmVTdHJpbmcnLCBMaW5lU3RyaW5nLCBzcnNOYW1lLCAnbGluZVN0cmluZycpO1xufVxuLyoqXG4gKiBjb252ZXJ0cyBhIGdlb2pzb24gZ2VvbWV0cnkgTXVsdGlQb2x5Z29uIHRvIGdtbFxuICogQGZ1bmN0aW9uIFxuICogQHBhcmFtIHtudW1iZXJbXVtdW11bXX0gY29vcmRzIHRoZSBjb29yZGluYXRlcyBtZW1iZXIgb2YgdGhlIGdlb21ldHJ5XG4gKiBAcGFyYW0ge3N0cmluZ3x1bmRlZmluZWR9IHNyc05hbWUgYSBzdHJpbmcgc3BlY2lmeWluZyBTUlNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGEgc3RyaW5nIG9mIGdtbCBkZXNjcmliaW5nIHRoZSBpbnB1dCBnZW9tZXRyeVxuICogQHNlZSBfbXVsdGlcbiAqIEBzZWUgUG9seWdvblxuICovXG5mdW5jdGlvbiBNdWx0aVBvbHlnb24oY29vcmRzLCBzcnNOYW1lKXtcbiAgcmV0dXJuIF9tdWx0aShjb29yZHMsICdNdWx0aVBvbHlnb24nLCBQb2x5Z29uLCBzcnNOYW1lLCAncG9seWdvbicpO1xufVxuY29uc3QgY29udmVydGVyID0ge1xuICBQb2ludCwgTGluZVN0cmluZywgTGluZWFyUmluZywgUG9seWdvbixcbiAgTXVsdGlQb2ludCwgTXVsdGlMaW5lU3RyaW5nLCBNdWx0aVBvbHlnb24sIEdlb21ldHJ5Q29sbGVjdGlvblxufTtcblxuLyoqXG4gKiBjb252ZXJ0cyBhIGdlb2pzb24gZ2VvbWV0cnkgR2VvbWV0cnlDb2xsZWN0aW9uIHRvIGdtbCBNdWx0aUdlb21ldHJ5XG4gKiBAZnVuY3Rpb24gXG4gKiBAcGFyYW0ge09iamVjdFtdfSBnZW9tcyBhbiBhcnJheSBvZiBnZW9qc29uIGdlb21ldHJ5IG9iamVjdHNcbiAqIEBwYXJhbSB7c3RyaW5nfHVuZGVmaW5lZH0gc3JzTmFtZSBhIHN0cmluZyBzcGVjaWZ5aW5nIFNSU1xuICogQHJldHVybnMge3N0cmluZ30gYSBzdHJpbmcgb2YgZ21sIGRlc2NyaWJpbmcgdGhlIGlucHV0IEdlb21ldHJ5Q29sbGVjdGlvblxuICogQHNlZSBfbXVsdGlcbiAqL1xuZnVuY3Rpb24gR2VvbWV0cnlDb2xsZWN0aW9uKGdlb21zLCBzcnNOYW1lKXtcbiAgcmV0dXJuIF9tdWx0aShnZW9tcywgJ011bHRpR2VvbWV0cnknLCBjb252ZXJ0ZXIsIHNyc05hbWUsICdnZW9tZXRyeScpO1xufVxuXG4vKipcbiAqIFRyYW5zbGF0ZSBnZW9qc29uIHRvIGdtbCAyLjEuMiBmb3IgYW55IGdlb2pzb24gZ2VvbWV0cnkgdHlwZVxuICogQGZ1bmN0aW9uIFxuICogQHBhcmFtIHtPYmplY3R9IGdlb20gYSBnZW9qc29uIGdlb21ldHJ5IG9iamVjdFxuICogQHBhcmFtIHtzdHJpbmd8dW5kZWZpbmVkfSBzcnNOYW1lIGEgc3RyaW5nIHNwZWNpZnlpbmcgU1JTXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBhIHN0cmluZyBvZiBnbWwgZGVzY3JpYmluZyB0aGUgaW5wdXQgZ2VvbWV0cnlcbiAqL1xuZnVuY3Rpb24gZ2VvbVRvR21sKGdlb20sIHNyc05hbWU9J0VQU0c6NDMyNicpe1xuICByZXR1cm4gY29udmVydGVyW2dlb20udHlwZV0oZ2VvbS5jb29yZGluYXRlcyB8fCBnZW9tLmdlb21ldHJpZXMsIHNyc05hbWUpO1xufVxuLyoqIGV4cG9ydHMgYSBmdW5jdGlvbiB0byBjb252ZXJ0IGdlb2pzb24gZ2VvbWV0cmllcyB0byBnbWwgMi4xLjIgKi9cbmV4cG9ydCB7XG4gIGdlb21Ub0dtbCwgUG9pbnQsIExpbmVTdHJpbmcsIExpbmVhclJpbmcsIFBvbHlnb24sXG4gIE11bHRpUG9pbnQsIE11bHRpTGluZVN0cmluZywgTXVsdGlQb2x5Z29uLCBHZW9tZXRyeUNvbGxlY3Rpb25cbn07XG4iXSwibmFtZXMiOlsiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwic3RyIiwicmVwbGFjZSIsImxldHRlciIsInRvVXBwZXJDYXNlIiwibG93ZXJGaXJzdExldHRlciIsInRvTG93ZXJDYXNlIiwiUG9pbnQiLCJjb29yZHMiLCJzcnNOYW1lIiwiam9pbiIsIkxpbmVTdHJpbmciLCJMaW5lYXJSaW5nIiwiUG9seWdvbiIsInBvbHlnb24iLCJsZW5ndGgiLCJsaW5lYXJSaW5nIiwic2xpY2UiLCJfbXVsdGkiLCJnZW9tIiwibmFtZSIsImNiIiwibWVtYmVyUHJlZml4IiwibXVsdGkiLCJtZW1iZXIiLCJfbWVtYmVyUHJlZml4IiwidHlwZSIsImNvb3JkaW5hdGVzIiwiSlNPTiIsInN0cmluZ2lmeSIsImlubmVyIiwiTXVsdGlQb2ludCIsIk11bHRpTGluZVN0cmluZyIsIk11bHRpUG9seWdvbiIsImNvbnZlcnRlciIsIkdlb21ldHJ5Q29sbGVjdGlvbiIsImdlb21zIiwiZ2VvbVRvR21sIiwiZ2VvbWV0cmllcyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7Ozs7O0FBVUEsU0FBU0EscUJBQVQsQ0FBK0JDLEdBQS9CLEVBQW1DO1NBQzFCQSxJQUFJQyxPQUFKLENBQVksSUFBWixFQUFtQkMsTUFBRCxJQUFZQSxPQUFPQyxXQUFQLEVBQTlCLENBQVA7Ozs7Ozs7OztBQVNGLFNBQVNDLGdCQUFULENBQTBCSixHQUExQixFQUE4QjtTQUNyQkEsSUFBSUMsT0FBSixDQUFZLElBQVosRUFBbUJDLE1BQUQsSUFBVUEsT0FBT0csV0FBUCxFQUE1QixDQUFQOzs7Ozs7Ozs7QUFTRixTQUFTQyxLQUFULENBQWVDLE1BQWYsRUFBdUJDLE9BQXZCLEVBQStCO1NBQ3JCLGFBQWFBLFVBQVcsYUFBWUEsT0FBUSxHQUEvQixHQUFvQyxFQUFJLEdBQXRELEdBQ0wsNkNBREssR0FFTEQsT0FBT0UsSUFBUCxFQUZLLEdBR0wsb0JBSEssR0FJTCxjQUpGOzs7Ozs7Ozs7QUFhRixTQUFTQyxVQUFULENBQW9CSCxNQUFwQixFQUE0QkMsT0FBNUIsRUFBb0M7U0FDMUIsa0JBQWtCQSxVQUFXLGFBQVlBLE9BQVEsR0FBL0IsR0FBa0MsRUFBSSxHQUF6RCxHQUNMLDZDQURLLEdBRUxELE9BQU9FLElBQVAsQ0FBWSxHQUFaLENBRkssR0FHTCxvQkFISyxHQUlMLG1CQUpGOzs7Ozs7Ozs7QUFhRixTQUFTRSxVQUFULENBQW9CSixNQUFwQixFQUE0QkMsT0FBNUIsRUFBb0M7U0FDMUIsa0JBQWtCQSxVQUFXLGFBQVlBLE9BQVEsR0FBL0IsR0FBa0MsRUFBSSxHQUF6RCxHQUNMLDZDQURLLEdBRUxELE9BQU9FLElBQVAsQ0FBWSxHQUFaLENBRkssR0FHTCxvQkFISyxHQUlMLG1CQUpGOzs7Ozs7Ozs7QUFhRixTQUFTRyxPQUFULENB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
