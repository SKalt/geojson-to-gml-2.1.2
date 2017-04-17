
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
    '_multi': function(name, memberName, geom, gmlId, params={}){
	var {srsName:srsName, srsDimension:srsDimension, gmlIds:gmlIds} = params;
	let multi = `<gml:${name}${attrs({srsName, 'gml:id':gmlId})}>`;
	for (var i = 0; i < geom.length; i ++){
	    var member = geom[i];
	    var memberType, _gmlId;
	    if (name == 'MultiGeometry'){
		_gmlId = member.id || (gmlIds || [])[i] || '';
		memberType = member.type;
		member = member.coordinates;
	    } else {
		_gmlId = (gmlIds || [])[i] || '';
		memberType = {'MultiPoint':'Point',
			      'MultiCurve':'LineString',
			      'MultiSurface':'Polygon'}[name];
	    }
	    if (!this[memberType]){throw new Error(`memberType:${memberType}`);}
	    multi += `<gml:${memberName}>` +
		this[memberType](member, _gmlId, params) +
		     `</gml:${memberName}>`;
	}
	multi += `</gml:${name}>`;
	return multi;
    },
    'Point': function(coords, gmlId, params={}){
	var {srsName:srsName, srsDimension:srsDimension} = params;
	return `<gml:Point${attrs({srsName:srsName, 'gml:id': gmlId})}>` +
	         `<gml:pos${attrs({srsDimension})}>` +
	               coords.join(' ') +
	          '</gml:pos>' +
	        '</gml:Point>';
    },
    'LineString': function(coords, gmlId, params={}){
	var {srsName:srsName, srsDimension:srsDimension} = params;
	return `<gml:LineString${attrs({srsName, 'gml:id':gmlId})}>` +
	    `<gml:posList${attrs({srsDimension})}>` +
	              coords.map((e)=>e.join(' ')).join(' ') + 
	          '</gml:posList>' +
	       '</gml:LineString>';
    },
    'LinearRing': function(coords, gmlId, params={}){
	var {srsName:srsName, srsDimension:srsDimension} = params;
	return `<gml:LinearRing${attrs({'gml:id':gmlId, srsName})}>` +
	          `<gml:posList${attrs({srsDimension})}>` +
	             coords.map((e)=>e.join(' ')).join(' ') + 
	          '</gml:posList>' + 
	       '</gml:LinearRing>';
    },
    'Polygon': function(coords, gmlId, params={}){
	// geom.coordinates are arrays of LinearRings
	var {srsName:srsName, srsDimension:srsDimension} = params;
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
    
    'MultiPoint': function(coords, gmlId, params={}){
	return this._multi('MultiPoint', 'pointMember', coords, gmlId, params);
    },
    'MultiLineString': function(coords, gmlId, params={}){
	return this._multi('MultiCurve', 'curveMember', coords, gmlId, params);
    },
    'MultiPolygon': function(coords, gmlId, params={}){
	return this._multi('MultiSurface', 'surfaceMember',
			   coords, gmlId, params);
    },
    'GeometryCollection': function(geoms, gmlId, params={}){
	return this._multi('MultiGeometry', 'geometryMember',
			   geoms, gmlId, params);
    }
};

function geomToGml(geom,
		   gmlId,
		   srsName='http://www.opengis.net/def/crs/EPSG/0/4326',
		   srsDimension,
		   gmlIds=[]){
    return converter[geom.type](geom.coordinates || geom.geometries,
				gmlId,
				srsName,
				srsDimension,
				gmlIds
			       ); 
}
exports.geomToGml = geomToGml;
