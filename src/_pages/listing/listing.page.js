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
        // const result = await fetch(`https://localhost:5001/api/properties`);
        // const json = await result.json();
        // this.setState({ data: json });

        // Use fake data
        let sample = [{ "propertyID": 1, "userID": 1, "price": 1149, "isAvailable": true, "longitude": 150.123, "latitude": -23.222, "availableStartDate": "2020-01-20T00:00:00", "availableEndDate": "2020-10-21T00:00:00", "hostDescription": "host description here1", "propertyDescription": "property description1", "neighbourhoodDescription": "neighborhood description1", "roomType": "suite", "washroomType": "no running water washroom", "genderPreference": "female", "pets": true, "wifiAndUtilitiesIncluded": true, "closestSchool": "BCIT", "unitNumber": "23A1", "streetNumber": "4800", "street": "Willingdon", "city": "Burnaby", "province": "BC", "country": "Country", "lastUpdatedBy": "PETERAHN", "lastUpdatedTime": "2020-05-08T17:00:45.0340319", "user": null, "tenantPropertyAssignments": null, "propertyImages": null }, { "propertyID": 2, "userID": 1, "price": 1862, "isAvailable": true, "longitude": 150.123, "latitude": -23.222, "availableStartDate": "2020-04-20T00:00:00", "availableEndDate": "2020-12-31T00:00:00", "hostDescription": "host description here1", "propertyDescription": "property description1", "neighbourhoodDescription": "neighborhood description1", "roomType": "suite", "washroomType": "no running water washroom", "genderPreference": "female", "pets": true, "wifiAndUtilitiesIncluded": true, "closestSchool": "BCIT", "unitNumber": "23A2", "streetNumber": "4800", "street": "Willingdon", "city": "Burnaby", "province": "BC", "country": "Country", "lastUpdatedBy": "PETERAHN", "lastUpdatedTime": "2020-05-08T17:00:45.0342601", "user": null, "tenantPropertyAssignments": null, "propertyImages": null }, { "propertyID": 3, "userID": 1, "price": 1530, "isAvailable": true, "longitude": 150.123, "latitude": -23.222, "availableStartDate": "2020-02-20T00:00:00", "availableEndDate": "2020-09-21T00:00:00", "hostDescription": "host description here1", "propertyDescription": "property description1", "neighbourhoodDescription": "neighborhood description1", "roomType": "suite", "washroomType": "no running water washroom", "genderPreference": "female", "pets": true, "wifiAndUtilitiesIncluded": true, "closestSchool": "BCIT", "unitNumber": "23A3", "streetNumber": "4800", "street": "Willingdon", "city": "Burnaby", "province": "BC", "country": "Country", "lastUpdatedBy": "PETERAHN", "lastUpdatedTime": "2020-05-08T17:00:45.0343334", "user": null, "tenantPropertyAssignments": null, "propertyImages": null }, { "propertyID": 4, "userID": 2, "price": 1347, "isAvailable": true, "longitude": 150.123, "latitude": -23.222, "availableStartDate": "2020-01-20T00:00:00", "availableEndDate": "2020-10-21T00:00:00", "hostDescription": "host description here1", "propertyDescription": "property description1", "neighbourhoodDescription": "neighborhood description1", "roomType": "suite", "washroomType": "no running water washroom", "genderPreference": "female", "pets": true, "wifiAndUtilitiesIncluded": true, "closestSchool": "BCIT", "unitNumber": "23A4", "streetNumber": "4800", "street": "Willingdon", "city": "Burnaby", "province": "BC", "country": "Country", "lastUpdatedBy": "PETERAHN", "lastUpdatedTime": "2020-05-08T17:00:45.0344027", "user": null, "tenantPropertyAssignments": null, "propertyImages": null }, { "propertyID": 5, "userID": 3, "price": 1512, "isAvailable": true, "longitude": 150.123, "latitude": -23.222, "availableStartDate": "2020-01-20T00:00:00", "availableEndDate": "2020-10-21T00:00:00", "hostDescription": "host description here1", "propertyDescription": "property description1", "neighbourhoodDescription": "neighborhood description1", "roomType": "suite", "washroomType": "no running water washroom", "genderPreference": "female", "pets": true, "wifiAndUtilitiesIncluded": true, "closestSchool": "BCIT", "unitNumber": "23A5", "streetNumber": "4800", "street": "Willingdon", "city": "Burnaby", "province": "BC", "country": "Country", "lastUpdatedBy": "PETERAHN", "lastUpdatedTime": "2020-05-08T17:00:45.0344895", "user": null, "tenantPropertyAssignments": null, "propertyImages": null }, { "propertyID": 6, "userID": 4, "price": 1861, "isAvailable": true, "longitude": 150.123, "latitude": -23.222, "availableStartDate": "2020-01-20T00:00:00", "availableEndDate": "2020-10-21T00:00:00", "hostDescription": "host description here1", "propertyDescription": "property description1", "neighbourhoodDescription": "neighborhood description1", "roomType": "suite", "washroomType": "no running water washroom", "genderPreference": "female", "pets": true, "wifiAndUtilitiesIncluded": true, "closestSchool": "BCIT", "unitNumber": "23A6", "streetNumber": "4800", "street": "Willingdon", "city": "Burnaby", "province": "BC", "country": "Country", "lastUpdatedBy": "PETERAHN", "lastUpdatedTime": "2020-05-08T17:00:45.0345724", "user": null, "tenantPropertyAssignments": null, "propertyImages": null }, { "propertyID": 7, "userID": 4, "price": 1296, "isAvailable": true, "longitude": 150.123, "latitude": -23.222, "availableStartDate": "2020-01-20T00:00:00", "availableEndDate": "2020-10-21T00:00:00", "hostDescription": "host description here1", "propertyDescription": "property description1", "neighbourhoodDescription": "neighborhood description1", "roomType": "suite", "washroomType": "no running water washroom", "genderPreference": "female", "pets": true, "wifiAndUtilitiesIncluded": true, "closestSchool": "BCIT", "unitNumber": "23A7", "streetNumber": "4800", "street": "Willingdon", "city": "Burnaby", "province": "BC", "country": "Country", "lastUpdatedBy": "PETERAHN", "lastUpdatedTime": "2020-05-08T17:00:45.0346664", "user": null, "tenantPropertyAssignments": null, "propertyImages": null }];
        this.setState({ data: sample })
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