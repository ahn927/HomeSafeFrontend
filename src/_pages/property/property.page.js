import React, { Component, createRef } from 'react'
import { withRouter } from "react-router-dom";

import {
    Card, Grid, Container, List, Divider, Header, Icon, Button, Label, Form, Sticky, Rail,
    Ref, Segment, Image, Message, Table, Modal, Popup
} from 'semantic-ui-react'
import { Formik } from 'formik'
import * as Yup from "yup"

import Map from '../../_components/map/map';
import CarouselComponent from './carousel.component'
import * as routes from '../../_constants/routes'
import * as images from '../../_constants/images'
import LoadingSpinner from '../../_components/loadingSpinner';

import auth from '../../_services/auth'


const timeoutLength = 2500


class PropertyPage extends React.Component {
    state = {
        id: null,
        propertyId: null,
        bookError: null,
        property: null,
        properties: [],
        userId: null,
        tenants: [],
        tenantInfoIsOpen: false,
        tenantApplied: false
    }

    handleOpen = () => {
        this.setState({ tenantInfoIsOpen: true })

        this.timeout = setTimeout(() => {
            this.setState({ tenantInfoIsOpen: false })
        }, timeoutLength)
    }

    handleClose = () => {
        this.setState({ tenantInfoIsOpen: false })
        clearTimeout(this.timeout)
    }




    async componentDidMount() {
        const id = this.props.match.params.id;
        const resultProperty = await fetch(`https://10kftdb.azurewebsites.net/api/properties/search/${id}`);
        const jsonProperty = await resultProperty.json();
        let temparray = this.state.properties;
        temparray.push(jsonProperty);
        this.setState({
            propertyId: id,
            properties: temparray,
            property: jsonProperty,
            userId: jsonProperty.userID
        });
        console.log(this.state.property);

        if (auth.currentUserValue && auth.currentUserValue.isLandlord) {
            const resultTenant = await fetch(`https://10kftdb.azurewebsites.net/api/properties/getAppliedpropertiesbylandlordid/${this.state.userId}`);
            let jsonTenant = await resultTenant.json();
            this.setState({
                tenants: jsonTenant
            })
            console.log(jsonTenant)
        }
    }

    contextRef = createRef()

    acceptTenant(uID, pID) {
        return async function () {
            console.log(uID + " w " + pID);
            fetch(`https://10kftdb.azurewebsites.net/api/properties/setTenantPropertyAssignmentVerification/${uID}/${pID}`, {
                method: 'PUT',
                heads: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success: ', data);

                })
                .catch((error) => {
                    console.error('Error: ', error);
                });
        }
    };

    renderHostMessage() {
        const currentUser = auth.currentUserValue;
        const { property } = this.state;

        if (!currentUser) return null;
        if (currentUser.userID != property.userID) return null;
        if (!this.state.tenants) {
            return (
                (
                    <div>
                        <Message color='blue'>
                            <Header as="h3">Dear {currentUser.userFirstName}</Header>
                            <p>There are 0 guests took this property.</p>
                        </Message>
                        <Divider></Divider>
                    </div>
                )
            )
        }

        let takenCount = this.state.tenants.length;
        let tableRows = [];

        this.state.tenants.forEach((tenant, key) => {
            if (tenant.propertyID == this.state.property.propertyID) {
                tableRows.push(
                    <Table.Row key={key}>
                        <Table.Cell collapsing>{tenant.tenantFirstName} {tenant.tenantLastName}</Table.Cell>
                        <Table.Cell collapsing><button onClick={this.acceptTenant(tenant.userID, tenant.propertyID)}> Accept </button></Table.Cell>
                    </Table.Row>
                )
            }
        })
        return (
            <div>
                <Message color='blue'>
                    <Header as="h3">Dear {currentUser.userFirstName}</Header>
                    <Table className="my-3" color='blue' inverted>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>GuestName</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Popup
                            on='click'
                            open={this.state.isOpen}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            position='top right'
                        >jdoisjos
                            </Popup>
                        <Table.Body>
                            {tableRows}
                        </Table.Body>
                    </Table>
                </Message>
                <Divider></Divider>
            </div>
        )
    }


    renderDivider(icon, text) {
        return (
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name={icon} />
                    {text}
                </Header>
            </Divider>
        )
    }

    renderListItem(icon, text, description) {
        return (
            <List.Item>
                <List.Icon name={icon} size='large' verticalAlign='middle' />
                <List.Content>
                    <List.Header>{text}</List.Header>
                    {description && (<List.Description >{description}</List.Description>)}
                </List.Content>
            </List.Item>
        )
    }

    rendernapshotInfo() {
        let property = this.state.property;

        return (
            <div>
                <Container>
                    <div className="d-flex justify-content-between">
                        <div></div>
                        <Card className="mx-2">
                            <Card.Content>
                                <List divided relaxed>
                                    {property.wifiAndUtilitiesIncluded && this.renderListItem('wifi', 'Utilities Provided')}
                                    {!property.wifiAndUtilitiesIncluded && this.renderListItem('wifi', 'Utilities Not Provided')}
                                </List>
                            </Card.Content>
                        </Card>
                        <Card className="mx-2">
                            <Card.Content>
                                <List divided relaxed>
                                    {this.renderListItem('bed', property.roomType)}
                                    {this.renderListItem('bath', property.washroomType)}
                                </List>
                            </Card.Content>
                        </Card>
                        <Card className="mx-2">
                            <Card.Content>
                                <List divided relaxed>
                                    {property.pets && this.renderListItem('paw', 'Pets Allowed')}
                                    {!property.pets && this.renderListItem('paw', 'Pets  Not Allowed')}
                                </List>
                            </Card.Content>
                        </Card>
                        <Card className="mx-2">
                            <Card.Content>
                                <List divided relaxed>
                                    {this.renderListItem('users', property.genderPreference)}
                                </List>
                            </Card.Content>
                        </Card>
                        <div></div>
                    </div>
                </Container>
            </div>
        )
    }

    renderDivdingHeader(icon, text) {
        return (
            <Header as='h3' dividing>
                {/* <Icon Icon name={icon} /> */}
                {text}
            </Header>
        )
    }

    bookNow(uID, pID, checkinDate, checkoutDate) {

        if (this.state.tenantApplied) {
            return function () {
                alert("already booked");
                console.log('booked popup')
            }
        }

        if (!checkinDate || !checkoutDate) return function () { console.log('date worng') }
        return async function () {
            const values = {
                userID: uID,
                propertyID: parseInt(pID),
                startDate: checkinDate,
                endDate: checkoutDate
            }
            console.log(values);
            fetch('https://10kftdb.azurewebsites.net/api/properties/tenantAppliesToProperty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success: ', data);
                })
                .catch((error) => {
                    console.error('Error: ', error);
                })
            this.setState({
                tenantApplied: true
            })
            alert("Booked Successful");
        }.bind(this);
    }

    renderForm() {
        return (
            <Formik
                initialValues={{ checkinDate: "", checkoutDate: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    if (!auth.currentUserValue) {
                        this.setState({ bookError: { message: 'You have not logged in.', loginBtn: true, registerBtn: true } })
                        console.log('render modal', 'no logged in')
                    }
                    else if (!auth.currentUserValue.isTenant) {
                        console.log(auth.currentUserValue)
                        this.setState({ bookError: { message: 'You need a tenant account to book a room.', loginBtn: false, registerBtn: true } })
                        console.log('render modal', 'no tenant')
                    }
                    else {
                        this.bookNow(auth.currentUserValue.userID, this.state.propertyId, values.checkinDate, values.checkoutDate)
                        console.log('booking')

                    }

                }}
                validationSchema={Yup.object().shape({
                    checkinDate: Yup.string()
                        .required("Required"),
                    checkoutDate: Yup.string()
                        .required("Required")
                })}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props;
                    return (
                        <div>
                            <Form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="checkinDate">Check-in</label>
                                    <input
                                        name="checkinDate"
                                        type="date"
                                        placeholder={new Date().toDateString()}
                                        value={values.checkinDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.checkinDate && touched.checkinDate && "error"} />
                                    {errors.checkinDate && touched.checkinDate && (
                                        <Label basic color='red' pointing>
                                            {errors.checkinDate}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                <div>

                                    <label htmlFor="checkoutDate">Check-out</label>
                                    <input
                                        name="checkoutDate"
                                        type="date"
                                        placeholder={(new Date()).toDateString()}
                                        value={values.checkoutDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.checkoutDate && touched.checkoutDate && "error"}
                                    />
                                    {errors.checkoutDate && touched.checkoutDate && (
                                        <Label basic color='red' pointing>
                                            {errors.checkoutDate}
                                        </Label>
                                    )}
                                </div>
                                <Divider />
                                {
                                    this.state.bookError &&
                                    <div className="my-3">
                                        <Message negative>
                                            <Message.Header>{this.state.bookError.message}</Message.Header>
                                            You have to logged in with a tenant account to book this room.<br />
                                            <Button size='tiny' color='red' content='Login' href={routes.LOGIN} className="my-2 mr-1" />
                                            <Button size='tiny' color='red' content='Register' href={routes.GUESTPERSONAL} className="my-2" />
                                        </Message>
                                        <Divider />
                                    </div>
                                }
                                {auth.currentUserValue ?
                                    <Button type="submit"
                                        onClick={this.bookNow(auth.currentUserValue.userID, this.state.propertyId, values.checkinDate, values.checkoutDate)}
                                    >
                                        Book Now
                                    </Button>
                                    :
                                    <Button type="submit">
                                        Book Now
                                    </Button>
                                }
                            </Form>

                        </div>
                    )
                }}

            </Formik>
        )
    }

    renderBookingBox() {
        return (
            <div>
                <Header as="h3">$ {this.state.property.price} <span className="font-weight-light">/month</span></Header>
                <span className="font-weight-light">smaller text will go here.</span>
                <Divider></Divider>
                <Header as="p" block>
                    <Icon circular color='green' name='clipboard check' size='small' verticalalign='middle' />
                    Verified Host
                    <Header.Subheader>This host is verifed by HomeSafe by conducting host background check.</Header.Subheader>
                </Header>
                <Divider></Divider>
                {this.renderForm()}
            </div>
        )
    }

    render() {
        if (!this.state.property) {
            return (<div> <LoadingSpinner /> </div>)
        }


        return (
            <div>
                <CarouselComponent images={this.state.property.propertyImageData} />
                {this.rendernapshotInfo()}
                <Grid style={{ minHeight: '100vh' }}>
                    <Grid.Column width="10">
                        <Ref innerRef={this.contextRef}>
                            <div>
                                {this.renderDivdingHeader('home', 'Room Information')}
                                <p>{this.state.property.propertyDescription}</p>
                                {this.renderDivdingHeader('id badge', 'Host Information')}
                                <p>{this.state.property.hostDescription}</p>
                                {this.renderDivdingHeader('home', 'Map')}
                                <Grid className='p-3'>
                                    <Grid.Row>
                                        <Grid.Column width={16} style={{ minHeight: '300px' }} >
                                            <Map properties={this.state.properties} propertyLng={this.state.property.longitude}
                                                propertyLat={this.state.property.latitude} />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                                <Rail position='right'>
                                    <Sticky active={false} context={this.contextRef}>
                                        <Card className="mt-3">
                                            <Card.Content>

                                                {this.renderHostMessage()}
                                                {this.renderBookingBox()}
                                            </Card.Content>
                                        </Card>
                                    </Sticky>
                                </Rail>
                            </div>
                        </Ref>
                    </Grid.Column>
                </Grid>
            </div>

        )
    }
}

export default PropertyPage;