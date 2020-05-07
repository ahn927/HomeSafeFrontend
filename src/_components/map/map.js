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