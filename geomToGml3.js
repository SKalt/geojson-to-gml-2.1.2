
/* 
Note this can only convert what geojson can store: simple feature types and
 not coverage, topology, etc.
 */
/** @private*/
function attrs(attrMappings){
    let results = '';
    for (let attrName in attrMappings){
	let value = attrMappings[attrName];
	results += (value ? ` ${attrName}="${value}"` : '');
    }
    return results;
}

const capital = (str) => str.replace(/^./, (letter) => letter.toUpperCase());
const lower = (str) => str.replace(/^./, (letter) => letter.toLowerCase());

var converter = {
    '_multi': function(name, memberName, geom, gmlId, srsName, srsDimension=''){
	let multi = `<gml:${name}${attrs({srsName, 'gml:id':gmlId})}>`;
	for (let member of geom){
	    if (member.type){
		// geometryCollection: memberPrefix should be '',
		var memberType = member.type;
		member = member.coordinates;
	    }
	    if (!memberType){
		throw new Error('un-typed member ' + JSON.stringify(member));
	    }
	    multi += `<gml:${memberName}>` +
		        converter[memberType](member, srsName='') +
		     `</gml:${memberName}>`;
	}
	multi += `</gml:${name}>`;
	return multi;
    },
    'Point': function(coords, gmlId, srsName, srsDimension){
	return `<gml:Point${attrs({srsName, 'gml:id': gmlId})}>` +
	         `<gml:pos${attrs({srsDimension})}>` +
	               coords.join() +
	          '</gml:pos>' +
	        '</gml:Point>';
    },
    'LineString': function(coords, gmlId, srsName, srsDimension){
	return `<gml:LineString${attrs({srsName, 'gml:id':gmlId})}>` +
	    `<gml:posList${attrs({srsDimension})}>` +
	              coords.join(' ') +
	          '</gml:posList>' +
	       '</gml:LineString>';
    },
    'LinearRing': function(coords, gmlId, srsName, srsDimension){
	return `<gml:LinearRing${attrs({'gml:id':gmlId, srsName})}>` +
	          `<gml:posList${attrs({srsDimension})}>` +
	            coords.join(' ') + 
	          '</gml:posList>' + 
	       '</gml:LinearRing>';
    },
    'Polygon': function(coords, gmlId, srsName, srsDimension){
	// geom.coordinates are arrays of LinearRings
	let polygon = `<gml:Polygon${attrs({srsName, 'gml:id':gmlId})}>` +
		       '<gml:exterior>' +
		          this.LinearRing(coords[0]) +
	               '</gml:exterior>';
	if (coords.length >= 2){
	    for (let linearRing of coords.slice(1)){
		polygon += '<gml:interior>' +
		             this.LinearRing(linearRing) + 
		           '</gml:interior>';
	    }
	}
	polygon += '</gml:Polygon>';
	return polygon;
    },
    
    'MultiPoint': function(coords, gmlId, srsName, srsDimension){
	return this._multi('MultiPoint', 'pointMember',
			   coords, gmlId, srsName, srsDimension);
    },
    'MultiLineString': function(coords, gmlId, srsName, srsDimension){
	return this._multi('MultiCurve', 'curveMember',
	    coords, gmlId, srsName, srsDimension);
    },
    'MultiPolygon': function(coords, gmlId, srsName, srsDimension){
	return this._multi('MultiSurface', 'surfaceMember',
	    coords, gmlId, srsName, srsDimension);
    },
    'GeometryCollection': function(geoms, gmlId, srsName, srsDimension){
	return this._multi('MultiGeometry', 'geometryMember',
			   geoms, gmlId, srsName, srsDimension);
    }
};

function geomToGml(geom, srsName='http://www.opengis.net/def/crs/EPSG/0/4326'){
    return converter[geom.type](geom.coordinates || geom.geometries, srsName); 
}
exports.geomToGml = geomToGml;
