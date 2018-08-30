import * as mapboxgl from 'mapbox-gl';

const places: mapboxgl.Layer = {
    "id": "places",
    "type": "symbol",
    "source": {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "properties": {
                    // "title": "Santa Barbara Courthouse",
                    "description": "<strong>Santa Barbara Courthouse</strong>",
                    "icon": "heart",
                    "icon-color": "#00a3f5"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-119.70228, 34.42412]
                }
            }]
        }
    },
    "layout": {
        "icon-image": "{icon}-15",
        "text-field": "{title}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.6],
        "text-anchor": "top"
    },
};

export default places;
