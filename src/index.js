import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import { Segment, Container } from 'semantic-ui-react'

import HomePage from "./_pages/home/home.page";
import LoginPage from "./_pages/login.page";
import dashboardPage from "./_pages/dashboard/dashboard.page";
import ProtectedRoute from "./_helpers/protected.route";
import configureFakeBackend from './_helpers/fake-backend';
import ListingPage from './_pages/listing/listing.page';
import PropertyPage from './_pages/property/property.page'

import AboutUsPage from './_pages/aboutus/aboutus.page'
import HostPersonalForm from './_pages/forms/host-personal-form';
import HostListingForm from './_pages/forms/host-listing-form';
import GuestForm from './_pages/forms/guest-form';
import Map from './_components/map/map';
import Search from './_components/map/search'

import * as routes from './_constants/routes'

import Navbar from './_components/navbar';
import Footer from './_components/footer';



class App extends React.Component {


    componentDidMount() {
        //configureFakeBackend();
    }
    render() {

        return (
            <div className="App">
                <BrowserRouter>
                    <Container>
                        <Navbar></Navbar>
                        <Switch>
                            <Route exact path={routes.HOME} component={HomePage} />
                            <Route exact path={routes.LOGIN} component={LoginPage} />
                            <Route exact path={routes.LISTING} component={ListingPage} />
                            <Route exact path={routes.PROPERTY + '/:id'} component={PropertyPage} />
                            <Route exact path={routes.ABOUTUS} component={AboutUsPage} />

                            <Route exact path={routes.HOSTPERSONAL} component={HostPersonalForm} />
                            <Route exact path={routes.HOSTLISTING} component={HostListingForm} />
                            <Route exact path={routes.GUESTPERSONAL} component={GuestForm} />

                            <ProtectedRoute
                                exact
                                path={routes.DASHBOARD}
                                component={dashboardPage} />
                            <Route path="*" component={() => "404 NOT FOUND"} />
                        </Switch>
                    </Container>
                    <Footer></Footer>
                </BrowserRouter>
            </div>
        )
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root"));
ReactDOM.render(<App />, document.querySelector("#root"));
