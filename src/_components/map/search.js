import React, { Component } from 'react'
import Geocoder from 'react-mapbox-gl-geocoder'
import ReactMapGL from 'react-map-gl'

import { Input } from 'semantic-ui-react'
import './searchstyle.css';

// mapboxgl.accessToken = 'pk.eyJ1IjoibWFwbGVzdG9yeTEyMyIsImEiOiJjazloam1pZHMwejFiM2xvNDVhdHE5eHNyIn0.ON5FdVNTkBiVc1iUkgHhVw';

const mapAccess = {
    mapboxApiAccessToken: 'pk.eyJ1IjoibWFwbGVzdG9yeTEyMyIsImEiOiJjazloam1pZHMwejFiM2xvNDVhdHE5eHNyIn0.ON5FdVNTkBiVc1iUkgHhVw'
}

const mapStyle = {
    width: '100%',
    height: 600
}

const queryParams = {
    // country: 'us'
}

const MyInput = (props) => <input {...props} placeholder="Search School / Landmarks / Address ..." />


class Search extends React.Component {
    state = {
        viewport: {}
    }

    onSelected = (viewport, item) => {
        this.setState({ viewport });
        console.log('viewport:', viewport)
        console.log('Selected: ', item)
    }

    render() {
        const { viewport } = this.state

        return (
            <div>
                <Geocoder
                    {...mapAccess}
                    onSelected={this.onSelected}
                    viewport={viewport}
                    hideOnSelect={true}
                    queryParams={queryParams}
                    placeholder='ds'
                    updateInputOnSelect={true}
                    // initialInputValue="Find School/Landmark/Transportation"
                    inputComponent={MyInput}

                />
            </div>
        )
    }
}

export default Search;