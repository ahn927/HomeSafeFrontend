import React from 'react'
import { Route, withRouter } from 'react-router-dom';

import auth from '../../_services/auth'
import LoadingSpinner from '../../_components/loadingSpinner';
import SortableTable from './sortableTable'
import PageHeader from '../../_components/pageHeader'
import { Message } from 'semantic-ui-react'

class dashboardPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: auth.currentUserValue,
            userInfo: null
        };
    }

    async componentDidMount() {
        const userResult = await fetch(`https://10kftdb.azurewebsites.net/api/users/${this.state.currentUser.userID}`);
        const userJson = await userResult.json();
        this.setState({
            userInfo: userJson
        })
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
                {
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
                }


                <SortableTable properties={userInfo.properties}></SortableTable>
            </div>
        )
    }

    renderGuest() {

    }

    renderStaff() {

    }

    render() {
        if(!this.state.userInfo) return <LoadingSpinner/>
        return (
            <div>
                {this.renderHost()}
            </div>)
    }

}

export default dashboardPage;