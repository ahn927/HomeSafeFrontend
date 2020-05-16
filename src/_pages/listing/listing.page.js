import React from 'react'

import { Divider, Header, Icon, Table, Grid, Image, Button } from 'semantic-ui-react'

import auth from '../../_services/auth'
import SearchBar from '../../_components/searchbar'
import * as Images from '../../_constants/images';
import Map from '../../_components/map/map';
import PageHeader from '../../_components/pageHeader'
import PropertyList from './propertyList'
import LoadingSpinner from '../../_components/loadingSpinner'




class ListingPage extends React.Component {
    state = {
        lat: null,
        long: null,
        errorMessage: null,
        searchValue: null,
        geoResult: null,
        data: null
    }

    handleSearch = (searchValue, geoResult) => {
        this.setState({ searchValue: searchValue, geoResult: geoResult });
        console.log('searchValue', this.state.searchValue);
        console.log('geoResult', this.state.geoResult);
        this.updateSearch(searchValue, geoResult)

    };

    async updateSearch(searchValue, geoResult) {
        fetch(`https://10kftdb.azurewebsites.net/api/Properties/searchproperty/${searchValue.maxRent}/${searchValue.minRent}/${searchValue.checkinDate}/${searchValue.checkoutDate}/any/any/${searchValue.gender}/2/${searchValue.city}/${geoResult.center[1]}/${geoResult.center[0]}/`
            , {
                method: 'Get',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.setState({ data })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    componentDidMount() {
        fetch(`https://10kftdb.azurewebsites.net/api/properties`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ data: result });
                },
                (error) => {
                    console.log('error', error)
                }
            )


    }

    render() {

        if (!this.state.data) return <div><LoadingSpinner /></div>

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
                    {
                        (this.state.data.length < 1) &&
                        <Grid.Row>
                            <Grid.Column width={16} className='text-center'>
                                No Matching Result. Please select another checkin/checkout date.
                            </Grid.Column>
                        </Grid.Row>
                    }

                    {
                        (this.state.data.length > 0) &&
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <PropertyList properties={this.state.data} />
                            </Grid.Column>
                            <Grid.Column width={8} className="pb-5">
                                <Map properties={this.state.data} />
                            </Grid.Column>
                        </Grid.Row>
                    }
                </Grid>


            </div>
        );
    }
}

export default ListingPage;