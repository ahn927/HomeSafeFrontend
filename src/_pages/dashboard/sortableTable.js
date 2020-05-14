import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react'
import * as routes from '../../_constants/routes'
const tableData = [
    { name: 'John', age: 15, gender: 'Male' },
    { name: 'Amber', age: 40, gender: 'Female' },
    { name: 'Leslie', age: 25, gender: 'Other' },
    { name: 'Ben', age: 70, gender: 'Male' },

    //                     "propertyId": 1,
    //                     "available": true,
    //                     "availableStartDate": "0001-01-01T00:00:00",
    //                     "availableEndDate": "0001-01-01T00:00:00",
    //                     "streetNumber": 1535,
    //                     "street": "30th ave",
    //                     "unitNumber": "5",
    //                     "city": "vancouver",
    //                     "province": "BC",
]

export default class SortableTable extends Component {

    state = {
        column: null,
        data: tableData,
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
                <Button className="m-3" floated='right' href={routes.HOSTLISTING}>Create New Listing</Button>
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
                                sorted={column === 'availableStartDate' ? direction : null}
                                onClick={this.handleSort('availableStartDate')}
                            >
                                Available Start Date
                        </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'availableEndDate' ? direction : null}
                                onClick={this.handleSort('availableEndDate')}
                            >
                                Available End Date
                        </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'available' ? direction : null}
                                onClick={this.handleSort('available')}
                            >
                                Availability
                         </Table.HeaderCell>
                            <Table.HeaderCell
                            >

                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(data, ({ propertyId, unitNumber, streetNumber, street, city, province, country, availableStartDate, availableEndDate, available }) => (
                            <Table.Row key={propertyId}>
                                <Table.Cell>{unitNumber}{unitNumber && '-'}{streetNumber} {street} {city}</Table.Cell>
                                <Table.Cell>{city}</Table.Cell>
                                {/* <Table.Cell>{province}</Table.Cell> */}
                                {/* <Table.Cell>{country}</Table.Cell> */}

                                <Table.Cell>{new Date(availableStartDate).toDateString()}</Table.Cell>
                                <Table.Cell>{new Date(availableEndDate).toDateString()}</Table.Cell>
                                <Table.Cell>{available && 'Yes'}{!available && 'Not Avaliable'}</Table.Cell>
                                <Table.Cell>
                                    <Button size='tiny' href={routes.EDIT_PROPERTY + '/' + propertyId} >Edit</Button>
                                    <Button size='tiny' href={routes.PROPERTY + '/' + propertyId}>View</Button>
                                </Table.Cell>

                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}