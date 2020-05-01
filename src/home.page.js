import React from 'react'
import auth from './_services/auth'

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <h1>Home page</h1>
                <h3>You are NOT login. You need to logged in to see content!</h3>
                <button onClick={
                    () => {
                        this.props.history.push("/login")
                    }
                }>Go Login page</button>
            </div>
        );
    }
}

export default HomePage;