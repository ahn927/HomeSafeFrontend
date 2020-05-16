import React from "react";
import mapboxgl from 'mapbox-gl';
import './mapstyle.css';
import MapboxGeocoder from 'mapbox-gl-geocoder';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwbGVzdG9yeTEyMyIsImEiOiJjazloam1pZHMwejFiM2xvNDVhdHE5eHNyIn0.ON5FdVNTkBiVc1iUkgHhVw';

class Map extends React.Component {
    constructor(props) {
        super(props);
        /*sets initial coordinates view to vancouver
             if you want user location
            window.navigator.geolocation.getCurrentPosition(
            position => {
                position.coords.latitude
                position.coords.longitude
            }    
            pass this information from parent in compononentDidMount() method
        */    
        this.state = {
            lng: -123.1207,
            lat: 49.2827,
            zoom: 10,
            results: null,
            properties: this.props.properties,
            propertyLng: this.props.propertyLng,
            propertyLat: this.props.propertyLat
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            //default location: vancouver
            //else if we pass in lng/lat, then move to that area
            //ternary operator !a ? b : a
            center: [!this.state.propertyLng ? this.state.lng : this.state.propertyLng, !this.state.propertyLat ? this.state.lat : this.state.propertyLat],
            zoom: !this.state.propertyLng ? this.state.zoom : 14
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
            let feature = {
                'type' : 'Feature',
                'properties': {
                    'title': property.unitNumber + ' ' + property.streetNumber + ' ' + property.street,
                    'description': property.propertyDescription,
                    'id': 'http://localhost:3000/property/' + property.propertyID
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
                        .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'
                        +  '<a href="' + marker.properties.id + '">Click Here to see more details</a>' ))
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