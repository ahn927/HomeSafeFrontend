import React from 'react'
import { Route, withRouter } from 'react-router-dom';

import auth from '../../_services/auth'

import SortableTable from './sortableTable'

class dashboardPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: auth.currentUserValue,
            userInfo: {
                "firstName": "first",
                "lastName": "last",
                "phoneNumber": "2368659199",
                "emailAddress": "wow@ee.ee",
                "streetNumber": "2418",
                "street": "East 19 the ave",
                "province": "BC",
                "country": "Canada",
                "isLandlord": true,
                "isVerified": true,
                "properties": [
                    {
                        "propertyId": 1,
                        "available": true,
                        "availableStartDate": "0001-01-01T00:00:00",
                        "availableEndDate": "0001-01-01T00:00:00",
                        "streetNumber": 1535,
                        "street": "30th ave",
                        "unitNumber": "5",
                        "city": "vancouver",
                        "province": "BC",
                    },
                    {
                        "propertyId": 1,
                        "available": true,
                        "availableStartDate": "0001-01-01T00:00:00",
                        "availableEndDate": "0001-01-01T00:00:00",
                        "streetNumber": 1535,
                        "street": "30th ave",
                        "unitNumber": "5",
                        "city": "vancouver",
                        "province": "BC",
                    },
                ]
            }

        };
    }

    renderHost() {
        const { currentUser, userInfo } = this.state;
        console.log(currentUser)
        return (
            <div>
                <h1>Dashboard page</h1>
                <h3>Hi, {currentUser.username}</h3>
                <p>Your background check status is Verified.</p>
                <h4>rooom list</h4>
                <SortableTable properties={userInfo.properties}></SortableTable>
                <button onClick={
                    () => {
                        auth.logout()
                        this.props.history.push("/")
                        window.location.reload();
                    }
                }>logout</button>
            </div>
        )
    }

    renderGuest() {

    }

    renderStaff() {

    }

    render() {
        return (
            <div>
                {this.renderHost()}
            </div>)
    }

}

export default dashboardPage;