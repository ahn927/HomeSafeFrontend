import React, {Component} from "react";
import mapboxgl from 'mapbox-gl';
import './mapstyle.css';

class Map extends Component {
    constructor(props) {
        super(props);
        //sets initial coordinates view to vancouver
        this.state = {
            lng: -123.1207,
            lat: 49.2827,
            zoom: 11
        };
    }


    componentDidMount() {
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFwbGVzdG9yeTEyMyIsImEiOiJjazloam1pZHMwejFiM2xvNDVhdHE5eHNyIn0.ON5FdVNTkBiVc1iUkgHhVw';
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        //adds controls to map
        map.addControl(new mapboxgl.NavigationControl());

        const data = {
            'features': [
                {
                        'type': 'Feature',
                        'properties': {
                        'title': 'BCIT School',
                        'link': "weeee",
                        'description':
                        '<strong>BCIT</strong><p><a href="https://www.bcit.ca/" target="_blank" title="Opens in a new window">BCIT Link</a> This is bcit, scam skool</p>'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-123.00111682335785, 49.2480164213475]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                    'title': 'NEAR BCIT THING',
                    'link': "wee2",
                    'description':
                    '<strong>Near BCIT</strong><p> somewhere near bcit <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">website link</a>, description string</p>'
                    },
                    'geometry': {
                    'type': 'Point',
                    'coordinates': [-123.00775451274126, 49.24972688317919]
                    }
                }
            ]
        };


        map.on('load', function() {		
			// map.addSource('places', {
			// 'type': 'geojson',
            // 'data': {
			// 	'type': 'FeatureCollection',
            //     'features': data.features
			// }
            // });

            // map.addLayer({
            //     'id': 'places',
            //     'type': 'symbol',
            //     'source': 'places',
            //     'layout': {
            //         'icon-image': '{icon}-15',
            //         'icon-allow-overlap': true
            //     }
            // });
            data.features.forEach(function(marker) {

                // create a HTML element for each feature
                var el = document.createElement('div');
                el.className = 'marker';
              
                // make a marker for each feature and add to the map
                new mapboxgl.Marker(el)
                  .setLngLat(marker.geometry.coordinates)
                  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                  .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>' + '<p>' + marker.properties.link + '</p>'))
                  .addTo(map);
              });



        });

        
        // When a click event occurs on a feature in the places layer, open a popup at the
        // location of the feature, with description HTML from its properties.
        // map.on('click', 'places', function (e) {
        //     var coordinates = e.features[0].geometry.coordinates.slice();
        //     var description = e.features[0].properties.description;

        //     // Ensure that if the map is zoomed out such that multiple
        //     // copies of the feature are visible, the popup appears
        //     // over the copy being pointed to.
        //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        //     }

        //     new mapboxgl.Popup()
        //         .setLngLat(coordinates)
        //         .setHTML(description)
        //         .addTo(map);
        // });

        // // Change the cursor to a pointer when the mouse is over the places layer.
        // map.on('mouseenter', 'places', function () {
        //     map.getCanvas().style.cursor = 'pointer';
        // });

        // // Change it back to a pointer when it leaves.
        // map.on('mouseleave', 'places', function () {
        //     map.getCanvas().style.cursor = '';
        // });
    }

    render() {
        return (
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer"/>
            </div>
        )
    }
}
export default Map;