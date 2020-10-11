#!/bin/bash
mkdir -p data/geojson
wget -O data/geojson/ne_10m_admin_0_map_units.json "https://github.com/martynafford/natural-earth-geojson/blob/master/10m/cultural/ne_10m_admin_0_map_units.json?raw=true"
wget -O data/geojson/ne_50m_admin_0_map_units.json "https://github.com/martynafford/natural-earth-geojson/blob/master/50m/cultural/ne_50m_admin_0_map_units.json?raw=true"
wget -O data/geojson/ne_110m_admin_0_map_units.json "https://github.com/martynafford/natural-earth-geojson/blob/master/110m/cultural/ne_110m_admin_0_map_units.json?raw=true"