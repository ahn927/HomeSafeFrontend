import React from 'react'

import { Divider, Header, Icon, Table, Grid, Image, Button } from 'semantic-ui-react'

import auth from '../../_services/auth'
import Search from '../../_components/search'
import * as Images from '../../_constants/images';
import Map from '../../_components/map/map';
import PageHeader from '../../_components/pageHeader'
import PropertyList from './propertyList'


class ListingPage extends React.Component {
    state = {
        lat: null,
        long: null,
        errorMessage: null,
        searchValue: null,
        data: []
    }

    handleSearch = (searchValue) => {
        this.setState({ searchValue: searchValue });
    };

    async componentDidMount() {
        const result = await fetch(`https://localhost:5001/api/properties`);
        const json = await result.json();
        this.setState({ data: json });
    }

    render() {

        if (this.state.data.length < 1) return <h1>page not found<br /><p>fetching Backend failed</p></h1>

        return (
            <div>
                <PageHeader
                    icon={null}
                    text='Search' >
                </PageHeader>
                <Search onClickSearch={this.handleSearch} />
                <PropertyList properties={this.state.data} />
                <Map properties={this.state.data} />
            </div>
        );
    }
}

export default ListingPage;