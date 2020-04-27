import React from 'react'

import auth from './_services/auth'

class LoginPage extends React.Component {
    render() {
        return (
            <div className="LoginPage">
                <h1>Login page</h1>
                <h3>Enter your user name and password here!</h3>
                <p>TODO: add username and password inputfield</p>
                <button onClick={
                    () => {
                        this.props.history.push("/")
                    }
                }>cancel</button>

                <button onClick={
                    () => {
                        auth.login('test', 'test')
                            .then(
                                user => {
                                    this.props.history.push("/dashboard")
                                },
                                error => {
                                    console.log(error)
                                }
                            )
                    }
                }>login</button>
            </div>
        )
    }
}

export default LoginPage;