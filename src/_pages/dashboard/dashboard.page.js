import React from 'react'
import { Route, withRouter } from 'react-router-dom';

import auth from '../../_services/auth'
import LoadingSpinner from '../../_components/loadingSpinner';
import HostPageSortableTable from './HostPageSortableTable'
import TenantPageSortableTable from './TenantPageSortableTable'
import StaffPageSortableTableUsers from './StaffPageSortableTableUsers'
import PageHeader from '../../_components/pageHeader'
import { Message, Grid, Header, Container } from 'semantic-ui-react'

class dashboardPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: auth.currentUserValue,
            userInfo: null,
            tenantProperties: null,
            allUsers: null
        };
    }

    async componentDidMount() {
        const userResult = await fetch(`https://10kftdb.azurewebsites.net/api/users/${this.state.currentUser.userID}`);
        const userJson = await userResult.json();
        this.setState({
            userInfo: userJson
        })
        console.log(userJson)

        if (this.state.currentUser.isTenant) {
            const properties = await fetch(`https://10kftdb.azurewebsites.net/api/Properties/getAppliedPropertiesByTenantID/${this.state.currentUser.userID}`);
            const tenantProperties = await properties.json();
            this.setState({
                tenantProperties: tenantProperties
            })
        }

        if (this.state.currentUser.isAdmin) {
            const users = await fetch(`https://10kftdb.azurewebsites.net/api/Users`);
            const userJson = await users.json();
            this.setState({
                allUsers: userJson
            })
            console.log(userJson)
        }


    }

    renderHost() {
        const { currentUser, userInfo } = this.state;
        console.log(currentUser)
        return (
            <div>
                <PageHeader
                    icon={null}
                    text='Host Dashboard' >
                </PageHeader>
                {/* {
                    currentUser.isVerifiedByStaff ?
                        (<Message
                            color='blue'>
                            <Message.Header>Your backround check was verified.</Message.Header>
                            <p>
                                HomeSafe staff had reviewed your application.
                    </p>
                        </Message>)
                        :
                        (<Message
                            color='red'>
                            <Message.Header>Your backround check is still in processing.</Message.Header>
                            <p>
                                HomeSafe staff is reviewing your application.
                    </p>
                        </Message>
                        )
                } */}
                {this.renderUserInfo()}
                <HostPageSortableTable properties={userInfo.properties}></HostPageSortableTable>
            </div>
        )
    }

    renderTenant() {
        const { currentUser, userInfo, tenantProperties } = this.state;
        console.log(currentUser)
        if (!this.state.tenantProperties) return <LoadingSpinner />

        return (
            <div>
                <PageHeader
                    icon={null}
                    text='Tenant Dashboard' >
                </PageHeader>
                {this.renderUserInfo()}
                <TenantPageSortableTable properties={tenantProperties}></TenantPageSortableTable>
            </div>
        )
    }

    renderStaff() {
        const { currentUser, allUsers } = this.state;
        console.log(allUsers)
        if (!this.state.allUsers) return <LoadingSpinner />

        return (
            <div>
                <PageHeader
                    icon={null}
                    text='Staff Dashboard' >
                </PageHeader>
                {this.renderUserInfo()}
                <StaffPageSortableTableUsers allUsers={allUsers}></StaffPageSortableTableUsers>
            </div>
        )
    }


    renderUserInfo() {
        const currentUser = this.state.currentUser;
        const userInfo = this.state.userInfo;
        let currentUserAddress = '';
        if (userInfo.userAddressUnitNumber)
            currentUserAddress += userInfo.userAddressUnitNumber + ' '
        if (userInfo.userAddressStreetNumber)
            currentUserAddress += userInfo.userAddressStreetNumber + ' '
        if (userInfo.userAddressStreet)
            currentUserAddress += userInfo.userAddressStreet + ' '
        if (userInfo.userAddressCity)
            currentUserAddress += userInfo.userAddressCity + ' '
        if (userInfo.userAddressProvince)
            currentUserAddress += userInfo.userAddressProvince + ' '
        if (userInfo.userAddressCountry)
            currentUserAddress += userInfo.userAddressCountry + ' '

        const item = (label, value) => {
            return (
                <Header as='h4'>
                    <Header.Content>
                        {label}
                        <Header.Subheader>{value}</Header.Subheader>
                    </Header.Content>
                </Header>
            )
        }
        return (
            <div>
                <Container>
                    <Grid divided='vertically'>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                {item('First Name', userInfo.userFirstName)}
                                {item('Email Address', userInfo.userEmailAddress)}
                                {item('Address', currentUserAddress)}
                                {currentUser.isTenant || true ? item('Date of Birth', new Date(userInfo.tenantDateOfBirth).toDateString()) : null}
                                {currentUser.isTenant || true ? item('Nationality', userInfo.tenantNationality) : null}
                            </Grid.Column>
                            <Grid.Column>
                                {item('Last Name', userInfo.userLastName)}
                                {item('Phone Number', userInfo.userPhoneNumber)}
                                {/* {currentUser.isTenant || true ? item('Reason to Stay', userInfo.tenantReasonForStay) : null} */}

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }

    render() {
        if (!this.state.userInfo) { return <LoadingSpinner /> }
        console.log('userinfo', this.state.userInfo);
        if (this.state.userInfo.isLandlord)
            return (this.renderHost())

        if (this.state.userInfo.isTenant)
            return (this.renderTenant())

        if (this.state.userInfo.isAdmin)
            return (this.renderStaff())

        return null
    }

}

export default dashboardPage;