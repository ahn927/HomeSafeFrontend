import React from 'react'

import { Divider, Header, Icon, Table, Grid, Image, Button } from 'semantic-ui-react'

import auth from '../../_services/auth'
import Search from '../../_components/search'
import * as Images from '../../_constants/images';
import Map from '../../_components/map/map';

import PropertyList from './propertyList'


class ListingPage extends React.Component {
    state = {
        lat: null,
        long: null,
        errorMessage: null,
        searchValue: null
    }

    handleSearch = (searchValue) => {
        this.setState({ searchValue: searchValue });
    };

    render() {
        let sample = [];
        for (var i = 0; i < 100; i++) {
            sample.push(
                {
                    address: `address no. ${i}`,
                    roomType: 'studio',
                    price: 1000,
                    pets: false,
                    bathroom: 'private'
                }
            )
        }
        return (
            <div>
                <h1>Listing page</h1>
                <Search onClickSearch={this.handleSearch} />
                <PropertyList properties={sample} />
                <Map/>
            </div>
        );
    }
}

export default ListingPage;