A package to translate geojson geometries to GML 2.1.2.

## Members

<dl>
<dt><a href="#geomToGml">geomToGml</a></dt>
<dd><p>exports a function to convert geojson geometries to gml 2.1.2</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#converter">converter</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#geomToGml">geomToGml(geom, srsName)</a> ⇒ <code>string</code></dt>
<dd><p>Translate geojson to gml 2.1.2 for any geojson geometry type</p>
</dd>
</dl>

<a name="geomToGml"></a>

## geomToGml
exports a function to convert geojson geometries to gml 2.1.2

**Kind**: global variable  
<a name="converter"></a>

## converter
**Kind**: global constant  

* [converter](#converter)
    * [~Point(coords, srsName)](#converter..Point) ⇒ <code>string</code>
    * [~LineString(coords, srsName)](#converter..LineString) ⇒ <code>string</code>
    * [~LinearRing(coords, srsName)](#converter..LinearRing) ⇒ <code>string</code>
    * [~Polygon(coords, srsName)](#converter..Polygon) ⇒ <code>string</code>
    * [~_multi(geom, name, srsName, memberPrefix)](#converter.._multi) ⇒ <code>string</code>
    * [~MultiPoint(coords, srsName)](#converter..MultiPoint) ⇒ <code>string</code>
    * [~MultiLineString(coords, srsName)](#converter..MultiLineString) ⇒ <code>string</code>
    * [~MultiPolygon(coords, srsName)](#converter..MultiPolygon) ⇒ <code>string</code>
    * [~GeometryCollection(geoms, srsName)](#converter..GeometryCollection) ⇒ <code>string</code>

<a name="converter..Point"></a>

### converter~Point(coords, srsName) ⇒ <code>string</code>
converts a geojson geometry Point to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string of gml describing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;number&gt;</code> | the coordinates member of the geometry |
| srsName | <code>string</code> \| <code>undefined</code> | a string specifying SRS |

<a name="converter..LineString"></a>

### converter~LineString(coords, srsName) ⇒ <code>string</code>
converts a geojson geometry LineString to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string of gml describing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the coordinates member of the geometry |
| srsName | <code>string</code> \| <code>undefined</code> | a string specifying SRS |

<a name="converter..LinearRing"></a>

### converter~LinearRing(coords, srsName) ⇒ <code>string</code>
converts a geojson geometry ring in a polygon to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string of gml describing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the coordinates member of the geometry |
| srsName | <code>string</code> \| <code>undefined</code> | a string specifying SRS |

<a name="converter..Polygon"></a>

### converter~Polygon(coords, srsName) ⇒ <code>string</code>
converts a geojson geometry Polygon to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string of gml describing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;number&gt;&gt;&gt;</code> | the coordinates member of the geometry |
| srsName | <code>string</code> \| <code>undefined</code> | a string specifying SRS |

<a name="converter.._multi"></a>

### converter~_multi(geom, name, srsName, memberPrefix) ⇒ <code>string</code>
Handles multigeometries or geometry collections

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string of gml describing the input multigeometry  
**Throws**:

- <code>Error</code> will throw an error if a member geometry is supplied without a `type` attribute


| Param | Type | Description |
| --- | --- | --- |
| geom | <code>Object</code> | a geojson geometry object |
| name | <code>string</code> | the name of the multigeometry, e.g. 'MultiPolygon' |
| srsName | <code>string</code> \| <code>undefined</code> | a string specifying the SRS |
| memberPrefix | <code>string</code> | the prefix of a gml member tag |

<a name="converter..MultiPoint"></a>

### converter~MultiPoint(coords, srsName) ⇒ <code>string</code>
converts a geojson geometry MultiPoint to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string of gml describing the input geometry  
**See**

- _multi
- Point


| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the coordinates member of the geometry |
| srsName | <code>string</code> \| <code>undefined</code> | a string specifying SRS |

<a name="converter..MultiLineString"></a>

### converter~MultiLineString(coords, srsName) ⇒ <code>string</code>
converts a geojson geometry MultiLineString to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string of gml describing the input geometry  
**See**

- _multi
- LineString


| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;number&gt;&gt;&gt;</code> | the coordinates member of the geometry |
| srsName | <code>string</code> \| <code>undefined</code> | a string specifying SRS |

<a name="converter..MultiPolygon"></a>

### converter~MultiPolygon(coords, srsName) ⇒ <code>string</code>
converts a geojson geometry MultiPolygon to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string of gml describing the input geometry  
**See**

- _multi
- Polygon


| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;Array.&lt;number&gt;&gt;&gt;&gt;</code> | the coordinates member of the geometry |
| srsName | <code>string</code> \| <code>undefined</code> | a string specifying SRS |

<a name="converter..GeometryCollection"></a>

### converter~GeometryCollection(geoms, srsName) ⇒ <code>string</code>
converts a geojson geometry GeometryCollection to gml MultiGeometry

**Kind**: inner method of [<code>converter</code>](#converter)  
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

