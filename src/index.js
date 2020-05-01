import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';


import { Segment, Container } from 'semantic-ui-react'


import HomePage from "./home.page";
import LoginPage from "./login.page";
import dashboardPage from "./dashboard.page";
import ProtectedRoute from "./_helpers/protected.route";
import configureFakeBackend from './_helpers/fake-backend';
import Navbar from './_components/navbar';


class App extends React.Component {

    componentDidMount() {
        configureFakeBackend();

    }
    render() {

        return (
            <div className="App">
                <Container>
                    <Navbar></Navbar>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/login" component={LoginPage} />
                        <ProtectedRoute
                            exact
                            path="/dashboard"
                            component={dashboardPage} />
                        <Route path="*" component={() => "404 NOT FOUND"} />
                    </Switch>

                </Container>
            </div>
        )
    }
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("root"));