---
title: "Demystifying geospatial visualisations"
updated: 2025-06-13 08:52:13Z
created: 2021-06-11 10:51:00Z
latitude: 35.89547060
longitude: 14.46650720
altitude: 0.0000
---

[Tools to use when working this geo data : r/datascience](https://www.reddit.com/r/datascience/comments/15w0bsw/comment/jx2wryb/)

## Data pre-processing

GeoPandas extends the datatypes used by Pandas to allow spatial operations on geometric types. `read_file()` loads geospatial data into a GeoDataFrame object that has all of the capabilities of a DataFrame, and more.

`gpd.points_from_xy()` creates Point objects from the latitude and longitude columns, transforming non-spatial data into spatial data:

```python
gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df['col1'], df['col2']))
```

A coordinate reference system (CRS) shows how the projected points correspond to real locations on Earth. CRSes are referenced by European Petroleum Survey Group (EPSG) codes:

- equal-area projections eg. EPSG 3035, preserve area
- equidistant projections eg. Azimuthal Equidistant projection, preserve distance
- EPSG 32630 (or Mercator) preserves angles and slightly distorts area, making it useful for sea navigation, while being less accurate than an equal-area projection for area calculation.

```python
gdf.crs = {'init': 'epsg:4326'}
gdf.to_crs(epsg=4326)
```

To measure distances between points from two different GeoDataFrames, make sure they are set to the same CRS whose type is distance-preserving.

In case the EPSG code is unavailable, you can re-project with the "proj4 string" of the CRS:

```python
gdf.to_crs("+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs")
```

The simplest way to find all the points that are some radius away from a specific location is by creating a buffer. Rather than iterating through each buffer and check individually if it contains a point, a more efficient way is to collapse all of them into a `MultiPolygon` object and do a single check with the `contains()` method:

```python
buffer_zones = gdf.geometry.buffer(buffer_size)
union = buffer_zones.geometry.unary_union
union.contains(gdf.loc[45].geometry)
```

Spatial joins involve combining GeoDataFrames based on the spatial relationship between the objects in the `geometry` columns. If a Point object from one GeoDataFrame intersects a Polygon object from the other, the corresponding rows are combined and added as a single row of the new GeoDataFrame:

```python
gpd.sjoin(gdf1, gdf2)
```

Once you're finished cleaning the data, export it as a Geoparquet file. For further file size optimisation, you might also consider combining the `unary_union`, dissolve and explode function to combine polygons that are coloured the same way.

## Tile providers

OpenStreetMap is a volunteer-run non-profit body and cannot supply tiles for large-scale commercial use. Rather, you should use a third-party (paid-for) [provider](https://switch2osm.org/providers/) that makes tiles from OSM data, or generate your own.

Some popular tile providers include [Mapbox](https://gomasuga.com/blog/mapbox-google-maps-alternative), Carto and MapTiler. There is also an [extension to Leaflet](https://github.com/leaflet-extras/leaflet-providers) that contains configurations for various free tile providers.

Opting for the self-hosted route via [OpenMapTiles](https://openmaptiles.org/) will put you in control of your own map server, and may be cheaper than a hosted solution in certain situations.[^1] Tools like [pg_tileserv](https://github.com/CrunchyData/pg_tileserv), which render data into vector tiles, are particularly helpful.

OpenMapTiles can be [self-hosted on a Postgres server](https://github.com/dechristopher/tegola-omt) with [Tegola](https://github.com/go-spatial/tegola) (or [Martin](https://github.com/maplibre/martin)) as the vector tile server. The vector tile maps may also be stored [in an S3 bucket](https://support.maptiler.com/i74-map-hosting-on-amazon-s3).

## API integration

You need to implement an appropriate library for your application to fetch the OSM tiles. Unlike Google Maps which offers its own API, there is no single canonical library for OSM, though the two most popular libraries are Leaflet and OpenLayers. APIs are also available for mobile platforms, such as [Route-Me](https://github.com/route-me/route-me) (iOS) and [osmdroid](https://github.com/osmdroid/osmdroid) (Android).

Leaflet isn't good enough for many mobile use cases due to performance issues. Mapbox, which is good, charges per load, that is, each time the map instance is initialised in code, regardless if you use your own tiles, or theirs, or no tiles at all. Although there's Maplibre (fork of Mapbox), Mapbox keeps pushing features forward on their proprietary platform with insane pricing models.

The maps displayed through the Google Maps API contain UI elements to allow user interaction with the map. Several of these controls are [configurable](https://developers.google.com/maps/documentation/javascript/controls), allowing their behaviour or appearance to be changed.

## Data overlay

[GeoJSON](https://www.youtube.com/watch?v=8RPfrhzRw2s) is a format for encoding a variety of geographic data structures. TopoJSON, an extension of GeoJSON that encodes topology, offers much more compact geometrical representations. Typical TopoJSON files are 80% smaller than their GeoJSON equivalents.

Only in situations where you have to use libraries that can only work with GeoJSON does the use of TopoJSON become less favourable since you would need a conversion tool like `topojson-client`.

For static visualisations, Cartopy is enough. Here's a [tutorial](https://www.net-analysis.com/blog/cartopymultiline.html) on how to use it to draw multi-line geometries.

[deck.gl](https://deck.gl/) is a WebGL-powered framework for visual exploratory data analysis of large datasets. While it can work without a base map, the library integrates well with base map providers, such as Carto (see [example](https://dancooksonresearch.carto.com/u/dancookson/viz/49ca276c-adf9-454a-8f64-0ccf0e46eed0/embed_map)). kepler.gl is built on top of MapLibre GL and deck.gl.

To overlay spatial data, you can upload the file to Carto, which uses deck.gl under the hood and will automatically take your Geoparquet file and make optimized tilesets of it.

You can instead export the data from GeoPandas as a FlatGeobuf, upload it to an S3 bucket, and use the deserialize function with Leaflet to only render the visible sections of the map, saving dramatically on lag time. Flatgeobuf has some code sample code for how to do this on their GitHub, but it definitely requires more tinkering to make happen. A tile server like TiTiler would still be required to serve the data, as explained [here](https://medium.com/@mdavid800/plotly-dash-interactive-mapping-dash-leaflet-titiler-e0c362d15e4).

For certain [types of geospatial data visualisation](https://www.safegraph.com/guides/visualizing-geospatial-data), the inclusion of a base map may actually be distracting for the viewer. With [d3.js](https://d3js.org/), which lacks a basemap (though it comes with a [plugin](https://d3-discovery.net/) for Leaflet.js integration), one can make use of SVG and CSS to style almost anything, if you're willing to get past its steep learning curve (see [example](https://observablehq.com/@d3/choropleth/2?intent=fork)). Britecharts is built on top of d3 and comes with more functionality, but at the cost of performance issues with large datasets.

Echarts performs better than d3 but the lack of proper documentation and limited use by people outside of China makes it harder to learn.

It's also possible nowadays to implement entire charts using a combination of HTML, JavaScript, and CSS, without worrying about scaling issues.

## Dashboarding

Matplotlib has a similar interface to Matlab and is fine for basic plotting. Its Basemap toolkit is deprecated in favour of Cartopy, a package designed for geospatial data processing that includes a programatic interface built on top of Matplotlib for the creation of [publication quality maps](https://medium.com/@lubomirfranko/climate-data-visualisation-with-python-visualise-climate-data-using-cartopy-and-xarray-cf35a60ca8ee).

Plotly introduces the user interaction with plots created in Python, JS or R. By default, it doesn't allow saving plots as files without a user token so you need to call a headless selenium instance and use that to extract the image. Bokeh is a web-focused tool for creating interactive plots in Python. Visualisations are saved as an HTML file.

[Dash](https://github.com/plotly/dash) in conjuction with Plotly is an ideal tool for dashboard building. Likewise, [Dash Deck](https://github.com/plotly/dash-deck), a proof of concept library that brings deck.gl into Dash.

Folium is a Python library for creating interactive Leaflet maps in HTML.It supports image, video, GeoJSON and TopoJSON overlays, and a number of built-in vector layers. One can also pass any tileset as a URL template; see [here](https://github.com/python-visualization/folium/tree/master/folium/templates/tiles) for details. A Folium map may also be part of a Dash dashboard [[example](https://github.com/riteshsharma29/Dash_Location_App/tree/main)].

[GIS](https://mangomap.com/what-is-gis) is software specifically developed to load, display, process, and export geographic data. It may be required for producing a finished map product, especially with multiple layers and different symbologies. This [guide](https://mapscaping.com/qgis-projects-into-interactive-online-maps/) explains how to turn a QGIS project into an interactive online map.

Datasette is a tool for exploring and publishing data which, combined with the SpatiaLite extension for SQLite, enables a full suite of geospatial SQL functions.

[^1]: While the act of self-hosting a tile server on your own hardware is [way cheaper](https://wcedmisten.fyi/post/self-hosting-osm/?utm_source=pocket_reader#user-content-fn-google-maps) than using cloud compute, the free tier of the Google Maps API can support roughly 13,000 monthly visitors.
