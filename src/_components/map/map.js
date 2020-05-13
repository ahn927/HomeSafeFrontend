import React from "react";
import mapboxgl from 'mapbox-gl';
import './mapstyle.css';
import MapboxGeocoder from 'mapbox-gl-geocoder';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwbGVzdG9yeTEyMyIsImEiOiJjazloam1pZHMwejFiM2xvNDVhdHE5eHNyIn0.ON5FdVNTkBiVc1iUkgHhVw';

class Map extends React.Component {
    constructor(props) {
        super(props);
        //sets initial coordinates view to vancouver
        this.state = {
            lng: -123.1207,
            lat: 49.2827,
            zoom: 11,
            results: null,
            properties: this.props.properties
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        //adds controls to map
        //map.addControl(new mapboxgl.NavigationControl());

        var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        });
        
        //creates a marker for dynamically searched locations
        var markerHTML = document.createElement('div');
            markerHTML.id = 'current-marker';
        let currentMarker = new mapboxgl.Marker(markerHTML);

        geocoder.on('result', async function (resultJSON) {
            // can also use an api call like such:
            // const result = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${mapboxgl.accessToken}`);
            // const body = await result.json();
            // console.log(body);
            console.log(resultJSON);
            
            //removes previous marker if exist, then adds the new one to map
            currentMarker.remove();
            currentMarker.setLngLat(resultJSON.result.center);
            currentMarker.addTo(map);
            
        })

        map.addControl(geocoder);

        const data = {
            'features' : []
        }

        //makes each property into a geojson object
        this.state.properties.forEach(function(property) {
            console.log(property);
            let feature = {
                'type' : 'Feature',
                'properties': {
                    'title': property.unitNumber + ' ' + property.streetNumber + ' ' + property.street,
                    'description': property.propertyDescription,
                    'id': property.propertyId
                    //add whatever extra fields you need here e.g vip code, country etc 
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [property.longitude, property.latitude]
                }
            }   
            data.features.push(feature);
        });

        map.on('load', function () {
            data.features.forEach(function (marker) {

                // create a HTML element for each feature
                var el = document.createElement('div');
                el.className = 'custom-marker';

                // make a marker for each feature and add to the map
                new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates)
                    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                        .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
                    .addTo(map);
            });


        });

    }

    render() {
        return (
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
            </div>
        )
    }
}
export default Map;