import React from 'react'

import auth from './_services/auth'

class dashboardPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: auth.currentUserValue,
        };
    }

    render() {
        const { currentUser } = this.state;
        console.log(currentUser)
        return (
            <div>
                <h1>Dashboard page</h1>
                <h3>Hi, {currentUser.username}</h3>
                <button onClick={
                    () => {
                        auth.logout()
                        this.props.history.push("/")
                    }
                }>logout</button>
            </div>
        )
    }

}

export default dashboardPage;