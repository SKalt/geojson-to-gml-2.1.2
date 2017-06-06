A package to translate geojson geometries to GML 2.1.2.
___

Geography Markup Language (GML) is an OGC Standard.

More information may be found at http://www.opengeospatial.org/standards/gml

The most current schema are available at http://schemas.opengis.net/ .
___

Policies, Procedures, Terms, and Conditions of OGC(r) are available at http://www.opengeospatial.org/ogc/legal/ .

OGC and OpenGIS are registered trademarks of Open Geospatial Consortium.

Copyright (c) 2012 Open Geospatial Consortium

## Functions

<dl>
<dt><a href="#Point">Point(coords, srsName)</a> ⇒ <code>string</code></dt>
<dd><p>converts a geojson geometry Point to gml</p>
</dd>
<dt><a href="#LineString">LineString(coords, srsName)</a> ⇒ <code>string</code></dt>
<dd><p>converts a geojson geometry LineString to gml</p>
</dd>
<dt><a href="#LinearRing">LinearRing(coords, srsName)</a> ⇒ <code>string</code></dt>
<dd><p>converts a geojson geometry ring in a polygon to gml</p>
</dd>
<dt><a href="#Polygon">Polygon(coords, srsName)</a> ⇒ <code>string</code></dt>
<dd><p>converts a geojson geometry Polygon to gml</p>
</dd>
<dt><a href="#_multi">_multi(geom, name, srsName, memberPrefix)</a> ⇒ <code>string</code></dt>
<dd><p>Handles multigeometries or geometry collections</p>
</dd>
<dt><a href="#MultiPoint">MultiPoint(coords, srsName)</a> ⇒ <code>string</code></dt>
<dd><p>converts a geojson geometry MultiPoint to gml</p>
</dd>
<dt><a href="#MultiLineString">MultiLineString(coords, srsName)</a> ⇒ <code>string</code></dt>
<dd><p>converts a geojson geometry MultiLineString to gml</p>
</dd>
<dt><a href="#MultiPolygon">MultiPolygon(coords, srsName)</a> ⇒ <code>string</code></dt>
<dd><p>converts a geojson geometry MultiPolygon to gml</p>
</dd>
<dt><a href="#GeometryCollection">GeometryCollection(geoms, srsName)</a> ⇒ <code>string</code></dt>
<dd><p>converts a geojson geometry GeometryCollection to gml MultiGeometry</p>
</dd>
<dt><a href="#geomToGml">geomToGml(geom, srsName)</a> ⇒ <code>string</code></dt>
<dd><p>Translate geojson to gml 2.1.2 for any geojson geometry type</p>
</dd>
</dl>

<a name="Point"></a>

## Point(coords, srsName) ⇒ <code>string</code>
converts a geojson geometry Point to gml

**Kind**: global function  
**Returns**: <code>string</code> - a string of gml describing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;number&gt;</code> | the coordinates member of the geometry |
| srsName | <code>string</code> \| <code>undefined</code> | a string specifying SRS |

<a name="LineString"></a>

## LineString(coords, srsName) ⇒ <code>string</code>
converts a geojson geometry LineString to gml

**Kind**: global function  
**Returns**: <code>string</code> - a string of gml describing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the coordinates member of the geometry |
| srsName | <code>string</code> \| <code>undefined</code> | a string specifying SRS |

<a name="LinearRing"></a>

## LinearRing(coords, srsName) ⇒ <code>string</code>
converts a geojson geometry ring in a polygon to gml

**Kind**: global function  
**Returns**: <code>string</code> - a string of gml describing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the coordinates member of the geometry |
| srsName | <code>string</code> \| <code>undefined</code> | a string specifying SRS |

<a name="Polygon"></a>

## Polygon(coords, srsName) ⇒ <code>string</code>
converts a geojson geometry Polygon to gml

**Kind**: global function  
**Returns**: <code>string</code> - a string of gml describing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;number&gt;&gt;&gt;</code> | the coordinates member of the geometry |
| srsName | <code>string</code> \| <code>undefined</code> | a string specifying SRS |

<a name="_multi"></a>

## _multi(geom, name, srsName, memberPrefix) ⇒ <code>string</code>
Handles multigeometries or geometry collections

**Kind**: global function  
**Returns**: <code>string</code> - a string of gml describing the input multigeometry  
**Throws**:

- <code>Error</code> will throw an error if a member geometry is supplied without a `type` attribute


| Param | Type | Description |
| --- | --- | --- |
| geom | <code>Object</code> | a geojson geometry object |
| name | <code>string</code> | the name of the multigeometry, e.g. 'MultiPolygon' |
| srsName | <code>string</code> \| <code>undefined</code> | a string specifying the SRS |
| memberPrefix | <code>string</code> | the prefix of a gml member tag |

<a name="MultiPoint"></a>

## MultiPoint(coords, srsName) ⇒ <code>string</code>
converts a geojson geometry MultiPoint to gml

**Kind**: global function  
**Returns**: <code>string</code> - a string of gml describing the input geometry  
**See**

- _multi
- Point


| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the coordinates member of the geometry |
| srsName | <code>string</code> \| <code>undefined</code> | a string specifying SRS |

<a name="MultiLineString"></a>

## MultiLineString(coords, srsName) ⇒ <code>string</code>
converts a geojson geometry MultiLineString to gml

**Kind**: global function  
**Returns**: <code>string</code> - a string of gml describing the input geometry  
**See**

- _multi
- LineString


| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;number&gt;&gt;&gt;</code> | the coordinates member of the geometry |
| srsName | <code>string</code> \| <code>undefined</code> | a string specifying SRS |

<a name="MultiPolygon"></a>

## MultiPolygon(coords, srsName) ⇒ <code>string</code>
converts a geojson geometry MultiPolygon to gml

**Kind**: global function  
**Returns**: <code>string</code> - a string of gml describing the input geometry  
**See**

- _multi
- Polygon


| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;Array.&lt;number&gt;&gt;&gt;&gt;</code> | the coordinates member of the geometry |
| srsName | <code>string</code> \| <code>undefined</code> | a string specifying SRS |

<a name="GeometryCollection"></a>

## GeometryCollection(geoms, srsName) ⇒ <code>string</code>
converts a geojson geometry GeometryCollection to gml MultiGeometry

**Kind**: global function  
**Returns**: <code>string</code> - a string of gml describing the input GeometryCollection  
**See**: _multi  

| Param | Type | Description |
| --- | --- | --- |
| geoms | <code>Array.&lt;Object&gt;</code> | an array of geojson geometry objects |
| srsName | <code>string</code> \| <code>undefined</code> | a string specifying SRS |

<a name="geomToGml"></a>

## geomToGml(geom, srsName) ⇒ <code>string</code>
Translate geojson to gml 2.1.2 for any geojson geometry type

**Kind**: global function  
**Returns**: <code>string</code> - a string of gml describing the input geometry  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| geom | <code>Object</code> |  | a geojson geometry object |
| srsName | <code>string</code> \| <code>undefined</code> | <code>&quot;EPSG:4326&quot;</code> | a string specifying SRS |

