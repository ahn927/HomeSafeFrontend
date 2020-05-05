import React from "react";
import ReactDOM from "react-dom";
import Map from "./components/map";
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import { Segment, Container } from 'semantic-ui-react'

import HomePage from "./_pages/home/home.page";
import LoginPage from "./_pages/login.page";
import dashboardPage from "./_pages/dashboard.page";
import ProtectedRoute from "./_helpers/protected.route";
import configureFakeBackend from './_helpers/fake-backend';

import * as routes from './_constants/routes'

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
                        <Route exact path={routes.HOME} component={HomePage} />
                        <Route exact path={routes.LOGIN} component={LoginPage} />
                        <ProtectedRoute
                            exact
                            path={routes.DASHBOARD}
                            component={dashboardPage} />
                        <Route path="*" component={() => "404 NOT FOUND"} />
                    </Switch>
                </Container>
            </div>
        )
    }
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("root"));