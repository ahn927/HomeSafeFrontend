import React from 'react'

import { Divider, Header, Icon, Table, Grid, Image, Button } from 'semantic-ui-react'

import auth from '../../_services/auth'
import SearchBar from '../../_components/searchbar'
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
        const result = await fetch(`https://10kftdb.azurewebsites.net/api/properties`);
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

                <Grid >
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <SearchBar onClickSearch={this.handleSearch} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={6}>
                            <PropertyList properties={this.state.data} />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Map properties={this.state.data} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


            </div>
        );
    }
}

export default ListingPage;