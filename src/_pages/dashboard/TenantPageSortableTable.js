import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react'
import * as routes from '../../_constants/routes'

export default class TenantPageSortableTable extends Component {

    state = {
        column: null,
        data: null,
        direction: null,
    }

    componentDidMount() {
        this.setState({ data: this.props.properties })
    }

    handleSort = (clickedColumn) => () => {
        const { column, data, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }


    render() {
        const { column, data, direction } = this.state

        return (
            <div>
                {/* <Button className="m-3" floated='right' href={routes.HOSTLISTING}>Create New Listing</Button> */}
                <Table sortable celled fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                            >
                                Address
                        </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'city' ? direction : null}
                                onClick={this.handleSort('city')}
                            >
                                City
                         </Table.HeaderCell>

                            <Table.HeaderCell
                                sorted={column === 'landlored' ? direction : null}
                                onClick={this.handleSort('landlored')}
                            >
                                Landlored
                        </Table.HeaderCell>

                            <Table.HeaderCell
                                sorted={column === 'availableStartDate' ? direction : null}
                                onClick={this.handleSort('availableStartDate')}
                            >
                                Desired Start Date
                        </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'availableEndDate' ? direction : null}
                                onClick={this.handleSort('availableEndDate')}
                            >
                                Desired End Date
                        </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'price' ? direction : null}
                                onClick={this.handleSort('price')}
                            >
                                Price
                        </Table.HeaderCell>
                            <Table.HeaderCell
                            >

                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(data, ({ propertyID, unitNumber, streetNumber, street, city, landlordFirstName, landlordLastName, price, startDate, endDate }) => (
                            <Table.Row key={propertyID}>
                                <Table.Cell>{unitNumber}{unitNumber && '-'}{streetNumber} {street} {city}</Table.Cell>
                                <Table.Cell>{city}</Table.Cell>
                                <Table.Cell>{landlordFirstName + ' ' + landlordLastName}</Table.Cell>

                                <Table.Cell>{new Date(startDate).toDateString()}</Table.Cell>
                                <Table.Cell>{new Date(endDate).toDateString()}</Table.Cell>
                                <Table.Cell>${price}</Table.Cell>
                                <Table.Cell>
                                    <Button size='tiny' href={routes.PROPERTY + '/' + propertyID}>View</Button>
                                </Table.Cell>

                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}