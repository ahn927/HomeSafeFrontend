import React from 'react'
import auth from '../../_services/auth'

import Search from './search'

class HomePage extends React.Component {

    state = {
        searchValue: null,
    }

    handleSearch = (searchValue) => {
        this.setState({ searchValue: searchValue });
    };

    render() {
        return (
            <div>
                <h1>Home page</h1>
                <Search onClickSearch={this.handleSearch} />
            </div>
        );
    }
}

export default HomePage;