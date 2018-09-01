import * as mapboxgl from 'mapbox-gl';
import places from './places';
import CONFIG from './config';

function addMap(): mapboxgl.Map {

    // es6 modules are immutable, this is a workaround
    // see: https://github.com/Microsoft/TypeScript/issues/6751#issuecomment-177114001
    (mapboxgl as any).accessToken = CONFIG.mapboxAccessToken;
    let ll = new mapboxgl.LngLat(-119.702222, 34.424111);

    let map = new mapboxgl.Map({
      container: 'map',
      center: ll,
      zoom: 13,
      attributionControl: false,
      style: 'mapbox://styles/bbrown4/cjlgzlt2a07902so1c00a8bx9'

    //   style: 'mapbox://styles/mapbox/outdoors-v9'
    });
    let nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');

    return map;
}

export default function createMap() {

    let map = addMap();

    map.on('load', function () {
        // Add a layer showing the places.
        map.addLayer(places);

        // When a click event occurs on a feature in the places layer, open a popup at the
        // location of the feature, with description HTML from its properties.
        map.on('click', 'places', function (e:any) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'places', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'places', function () {
            map.getCanvas().style.cursor = '';
        });
    });
};

 