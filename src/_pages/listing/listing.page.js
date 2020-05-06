import React from 'react'

import { Divider, Header, Icon, Table, Grid, Image, Button } from 'semantic-ui-react'

import auth from '../../_services/auth'
import Search from '../../_components/search'
import * as Images from '../../_constants/images';

class ListingPage extends React.Component {

    state = {
        searchValue: null,
    }

    handleSearch = (searchValue) => {
        this.setState({ searchValue: searchValue });
    };

    render() {
        return (
            <div>
                <h1>Listing page</h1>
                <Search onClickSearch={this.handleSearch} />



            </div>
        );
    }
}

export default ListingPage;