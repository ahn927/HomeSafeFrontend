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
import FaqPage from './_pages/faq/faq.page'
import ReviewPage from './_pages/review/review.page'

import AboutUsPage from './_pages/aboutus/aboutus.page'
import HostPersonalForm from './_pages/forms/host-personal-form';
import HostListingForm from './_pages/forms/host-listing-form';
import GuestForm from './_pages/forms/guest-form';
import EditHostPersonal from './_pages/forms/edit/edit-host-personal';
import EditHostListing from './_pages/forms/edit/edit-host-listing';
import EditGuest from './_pages/forms/edit/edit-guest';
import Map from './_components/map/map';
import Search from './_components/map/search'

import * as routes from './_constants/routes'

import Navbar from './_components/navbar';
import Footer from './_components/footer';



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
                        <Route exact path={routes.LISTING} component={ListingPage} />
                        <Route exact path={routes.PROPERTY + '/:id'} component={PropertyPage} />
                        <Route exact path={routes.ABOUTUS} component={AboutUsPage} />
                        <Route exact path={routes.FAQ} component={FaqPage} />
                        <Route exact path={routes.REVIEWS} component={ReviewPage} />
                        <Route exact path={routes.BECOME_HOST} component={HostPersonalForm} />
                        <Route exact path={routes.HOSTLISTING} component={HostListingForm} />
                        <Route exact path={routes.GUESTPERSONAL} component={GuestForm} />
                        <Route exact path={routes.EDIT_HOST} component={EditHostPersonal} />
                        <Route exact path={routes.EDITLISTING} component={EditHostListing} />
                        <Route exact path={routes.EDITGUEST} component={EditGuest} />

                        <ProtectedRoute
                            exact
                            path={routes.DASHBOARD}
                            component={dashboardPage} />
                        <Route path="*" component={() => "404 NOT FOUND"} />
                    </Switch>
                </Container>
                <Footer></Footer>
            </div>
        )
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root"));
