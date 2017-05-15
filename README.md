A package to translate geojson geometries to GML 2.1.2 or 3.2.1.
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
<dt><a href="#converter">converter</a></dt>
<dd><p>a namespace to switch between geojson-handling functions by geojson.type</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#geomToGml">geomToGml(geom, srsName)</a> ⇒ <code>string</code></dt>
<dd><p>Translate geojson to gml 2.1.2 for any geojson geometry type</p>
</dd>
<dt><a href="#enforceGmlId">enforceGmlId()</a></dt>
<dd><p>checks outer scope for gmlId argument/variable</p>
</dd>
<dt><a href="#geomToGml">geomToGml(geom, gmlId, params, gmlIds)</a> ⇒ <code>string</code></dt>
<dd><p>Translates any geojson geometry into GML 3.2.1</p>
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
    * _static_
        * [._multi(name, memberName, geom, gmlId, params)](#converter._multi) ⇒ <code>string</code>
    * _inner_
        * [~Point(coords, srsName)](#converter..Point) ⇒ <code>string</code>
        * [~LineString(coords, srsName)](#converter..LineString) ⇒ <code>string</code>
        * [~LinearRing(coords, srsName)](#converter..LinearRing) ⇒ <code>string</code>
        * [~Polygon(coords, srsName)](#converter..Polygon) ⇒ <code>string</code>
        * [~_multi(geom, name, srsName, memberPrefix)](#converter.._multi) ⇒ <code>string</code>
        * [~MultiPoint(coords, srsName)](#converter..MultiPoint) ⇒ <code>string</code>
        * [~MultiLineString(coords, srsName)](#converter..MultiLineString) ⇒ <code>string</code>
        * [~MultiPolygon(coords, srsName)](#converter..MultiPolygon) ⇒ <code>string</code>
        * [~GeometryCollection(geoms, srsName)](#converter..GeometryCollection) ⇒ <code>string</code>
        * [~Point(coords, gmlId, params)](#converter..Point) ⇒ <code>string</code>
        * [~LineString(coords, gmlId, params)](#converter..LineString) ⇒ <code>string</code>
        * [~LinearRing(coords, gmlId, params)](#converter..LinearRing) ⇒ <code>string</code>
        * [~Polygon(coords, gmlId, params)](#converter..Polygon) ⇒ <code>string</code>
        * [~MultiPoint(coords, gmlId, params)](#converter..MultiPoint) ⇒ <code>string</code>
        * [~MultiLineString(coords, gmlId, params)](#converter..MultiLineString) ⇒ <code>string</code>
        * [~MultiPolygon(coords, gmlId, params)](#converter..MultiPolygon) ⇒ <code>string</code>
        * [~GeometryCollection(coords, gmlId, params)](#converter..GeometryCollection) ⇒ <code>string</code>

<a name="converter._multi"></a>

### converter._multi(name, memberName, geom, gmlId, params) ⇒ <code>string</code>
A handler to compile geometries to multigeometries

**Kind**: static method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml describing the input multigeometry  
**Throws**:

- <code>Error</code> if a member geometry cannot be converted to gml

**Memeberof**: converter~  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the target multigeometry |
| memberName | <code>string</code> | the gml:tag of each multigeometry member. |
| geom | <code>Array.&lt;Object&gt;</code> \| <code>Array</code> | an array of geojson geometries |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id of the multigeometry |
| params | <code>Object</code> | optional parameters. Omit gmlIds at your own risk, however. |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.gmlIds | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> | an array of number/string gml:ids of the member geometries. |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

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

<a name="converter..Point"></a>

### converter~Point(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson Point geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;number&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..LineString"></a>

### converter~LineString(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson LineString geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..LinearRing"></a>

### converter~LinearRing(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson LinearRing member of a polygon geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..Polygon"></a>

### converter~Polygon(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson Polygon geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;number&gt;&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..MultiPoint"></a>

### converter~MultiPoint(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson MultiPoint geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..MultiLineString"></a>

### converter~MultiLineString(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson MultiLineString geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;number&gt;&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..MultiPolygon"></a>

### converter~MultiPolygon(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson MultiPolygon geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;Array.&lt;number&gt;&gt;&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..GeometryCollection"></a>

### converter~GeometryCollection(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson GeometryCollection geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Object&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter"></a>

## converter
a namespace to switch between geojson-handling functions by geojson.type

**Kind**: global constant  

* [converter](#converter)
    * _static_
        * [._multi(name, memberName, geom, gmlId, params)](#converter._multi) ⇒ <code>string</code>
    * _inner_
        * [~Point(coords, srsName)](#converter..Point) ⇒ <code>string</code>
        * [~LineString(coords, srsName)](#converter..LineString) ⇒ <code>string</code>
        * [~LinearRing(coords, srsName)](#converter..LinearRing) ⇒ <code>string</code>
        * [~Polygon(coords, srsName)](#converter..Polygon) ⇒ <code>string</code>
        * [~_multi(geom, name, srsName, memberPrefix)](#converter.._multi) ⇒ <code>string</code>
        * [~MultiPoint(coords, srsName)](#converter..MultiPoint) ⇒ <code>string</code>
        * [~MultiLineString(coords, srsName)](#converter..MultiLineString) ⇒ <code>string</code>
        * [~MultiPolygon(coords, srsName)](#converter..MultiPolygon) ⇒ <code>string</code>
        * [~GeometryCollection(geoms, srsName)](#converter..GeometryCollection) ⇒ <code>string</code>
        * [~Point(coords, gmlId, params)](#converter..Point) ⇒ <code>string</code>
        * [~LineString(coords, gmlId, params)](#converter..LineString) ⇒ <code>string</code>
        * [~LinearRing(coords, gmlId, params)](#converter..LinearRing) ⇒ <code>string</code>
        * [~Polygon(coords, gmlId, params)](#converter..Polygon) ⇒ <code>string</code>
        * [~MultiPoint(coords, gmlId, params)](#converter..MultiPoint) ⇒ <code>string</code>
        * [~MultiLineString(coords, gmlId, params)](#converter..MultiLineString) ⇒ <code>string</code>
        * [~MultiPolygon(coords, gmlId, params)](#converter..MultiPolygon) ⇒ <code>string</code>
        * [~GeometryCollection(coords, gmlId, params)](#converter..GeometryCollection) ⇒ <code>string</code>

<a name="converter._multi"></a>

### converter._multi(name, memberName, geom, gmlId, params) ⇒ <code>string</code>
A handler to compile geometries to multigeometries

**Kind**: static method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml describing the input multigeometry  
**Throws**:

- <code>Error</code> if a member geometry cannot be converted to gml

**Memeberof**: converter~  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the target multigeometry |
| memberName | <code>string</code> | the gml:tag of each multigeometry member. |
| geom | <code>Array.&lt;Object&gt;</code> \| <code>Array</code> | an array of geojson geometries |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id of the multigeometry |
| params | <code>Object</code> | optional parameters. Omit gmlIds at your own risk, however. |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.gmlIds | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> | an array of number/string gml:ids of the member geometries. |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

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

<a name="converter..Point"></a>

### converter~Point(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson Point geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;number&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..LineString"></a>

### converter~LineString(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson LineString geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..LinearRing"></a>

### converter~LinearRing(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson LinearRing member of a polygon geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..Polygon"></a>

### converter~Polygon(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson Polygon geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;number&gt;&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..MultiPoint"></a>

### converter~MultiPoint(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson MultiPoint geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..MultiLineString"></a>

### converter~MultiLineString(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson MultiLineString geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;number&gt;&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..MultiPolygon"></a>

### converter~MultiPolygon(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson MultiPolygon geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Array.&lt;Array.&lt;Array.&lt;number&gt;&gt;&gt;&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="converter..GeometryCollection"></a>

### converter~GeometryCollection(coords, gmlId, params) ⇒ <code>string</code>
Converts an input geojson GeometryCollection geometry to gml

**Kind**: inner method of [<code>converter</code>](#converter)  
**Returns**: <code>string</code> - a string containing gml representing the input geometry  

| Param | Type | Description |
| --- | --- | --- |
| coords | <code>Array.&lt;Object&gt;</code> | the coordinates member of the geojson geometry |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id |
| params | <code>Object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | as string specifying SRS |
| params.srsDimension | <code>number</code> \| <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |

<a name="geomToGml"></a>

## geomToGml(geom, srsName) ⇒ <code>string</code>
Translate geojson to gml 2.1.2 for any geojson geometry type

**Kind**: global function  
**Returns**: <code>string</code> - a string of gml describing the input geometry  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| geom | <code>Object</code> |  | a geojson geometry object |
| srsName | <code>string</code> \| <code>undefined</code> | <code>&quot;EPSG:4326&quot;</code> | a string specifying SRS |

<a name="enforceGmlId"></a>

## enforceGmlId()
checks outer scope for gmlId argument/variable

**Kind**: global function  
<a name="geomToGml"></a>

## geomToGml(geom, gmlId, params, gmlIds) ⇒ <code>string</code>
Translates any geojson geometry into GML 3.2.1

**Kind**: global function  
**Returns**: <code>string</code> - a valid gml string describing the input geojson geometry  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>Object</code> | a geojson geometry object |
| geom.coordinates | <code>Array</code> \| <code>undefined</code> | the nested array of coordinates forming the geometry |
| geom.geometries | <code>Array.&lt;Object&gt;</code> \| <code>undefined</code> | for a GeometryCollection only, the array of member geometry objects |
| gmlId | <code>string</code> \| <code>number</code> | the gml:id of the geometry |
| params | <code>object</code> | optional parameters |
| params.srsName | <code>string</code> \| <code>undefined</code> | a string specifying the SRS |
| params.srsDimension | <code>string</code> \| <code>undefined</code> | the dimensionality of each coordinate, i.e. 2 or 3. |
| gmlIds | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> \| <code>undefined</code> | an array of number/string gml:ids of the member geometries of a multigeometry. |

