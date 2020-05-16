import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react'
import * as routes from '../../_constants/routes'

export default class StaffPageSortableTableUsers extends Component {

    state = {
        column: null,
        data: null,
        direction: null,
    }

    componentDidMount() {
        this.setState({ data: this.props.allUsers })
        console.log(this.props.allUsers)
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

        console.log('data', data)

        return (
            <div>
                {/* <Button className="m-3" floated='right' href={routes.HOSTLISTING}>Create New Listing</Button> */}
                <Table sortable celled fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={column === 'firstName' ? direction : null}
                                onClick={this.handleSort('firstName')}
                            >
                                First Name
                         </Table.HeaderCell>

                            <Table.HeaderCell
                                sorted={column === 'lastName' ? direction : null}
                                onClick={this.handleSort('lastName')}
                            >
                                Last Name
                        </Table.HeaderCell>

                            <Table.HeaderCell
                                sorted={column === 'accountType' ? direction : null}
                                onClick={this.handleSort('accountType')}
                            >
                                Account Type
                        </Table.HeaderCell>

                            <Table.HeaderCell
                            >

                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(data, ({ userID, userFirstName, userLastName, isAdmin, isLandLord, isTenant }) => (
                            <Table.Row key={userID}>
                                <Table.Cell>{userFirstName}</Table.Cell>
                                <Table.Cell>{userLastName}</Table.Cell>
                                <Table.Cell>{isAdmin && 'Staff'} {isLandLord && 'Host'} {isTenant && 'Tenant'}</Table.Cell>

                                <Table.Cell>
                                    <Button size='tiny' href={'/forms/guest/edit/' + userID}>Edit</Button>
                                </Table.Cell>

                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}