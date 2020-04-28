import React, {Component} from "react";
import ReactDOM from "react-dom";
import mapboxgl from 'mapbox-gl';


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -123.1207,
            lat: 49.2827,
            zoom: 9
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
    }

    render() {
        const style = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '50%',
            height: '50%'
          };

        return (
            <div>
                <div>test2</div>
                <div style={style} ref={el => this.mapContainer = el} className="mapContainer"/>
            </div>
        )
    }
}
export default Map;