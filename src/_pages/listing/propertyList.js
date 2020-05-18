import React from 'react'

import { Pagination } from 'semantic-ui-react'


import PropertyCard from './propertyCard'

class PropertyList extends React.Component {
    state = {
        properties: this.props.properties,
        currentPage: 1,
        propertiesPerPage: 5,
        selectedProperty: null,
        cards: []
    }

    handlePaginationChange = (e, { activePage }) => {
        console.log('activePage', activePage)
        this.setState({ currentPage: activePage })
    }


    renderPagination() {
        let { currentPage, propertiesPerPage, properties } = this.state
        let totalPages = Math.ceil(properties.length / propertiesPerPage)

        return (
            <Pagination
                boundaryRange={1}
                siblingRange={1}
                firstItem={null}
                lastItem={null}
                defaultActivePage={currentPage}
                totalPages={totalPages}
                onPageChange={this.handlePaginationChange} />
        )
    }

    renderList() {
        let cards = [];
        let { currentPage, propertiesPerPage, properties } = this.state
        for (let i = 0; i < propertiesPerPage; i++) {
            let index = i + (currentPage - 1) * propertiesPerPage
            console.log('index', index)
            cards.push(
                <PropertyCard key={index} property={properties[index]} />
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