import React from 'react'

import { Pagination } from 'semantic-ui-react'


import PropertyCard from './propertyCard'

class PropertyList extends React.Component {
    state = {
        properties: this.props.properties,
        currentPage: 1,
        propertiesPerPage: 10,
        selectedProperty: null
    }

    handlePaginationChange = (e, { activePage }) => {
        console.log(activePage)
        this.setState({ currentPage: activePage })
    }


    renderPagination() {
        let { currentPage, propertiesPerPage, properties } = this.state
        let totalPages = Math.ceil(properties.length / propertiesPerPage)

        return (
            <Pagination
                boundaryRange={1}
                siblingRange={1}
                defaultActivePage={currentPage}
                totalPages={totalPages}
                onPageChange={this.handlePaginationChange} />
        )
    }

    renderList() {
        let cards = [];
        let { currentPage, propertiesPerPage, properties } = this.state
        for (let i = 0; i < propertiesPerPage; i++) {
            cards.push(
                <PropertyCard property={properties[i + (currentPage - 1) * propertiesPerPage]} />
            )
        }

        return cards;
    }

    render() {
        return (
            <div className="PropertyList">
                {this.renderList()}
                {this.renderPagination()}
            </div>
        )
    }


}

export default PropertyList