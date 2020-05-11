import React, { Component, createRef } from 'react'
import { useParams } from 'react-router-dom'

import {
    Card, Grid, Container, List, Divider, Header, Icon, Button, Label, Form, Sticky, Rail,
    Ref, Segment, Image, Message, Table, Modal
} from 'semantic-ui-react'
import { Formik } from 'formik'
import * as Yup from "yup"

import CarouselComponent from './carousel.component'
import * as routes from '../../_constants/routes'
import * as images from '../../_constants/images'

import auth from '../../_services/auth'


class PropertyPage extends React.Component {


    state = {
        propertyId: null,
        modalOpen: false,
        bookError: '',
        property: {
            "propertyId": 1,
            "price": 1000.99,
            "hostDescription": "george is a ….",
            "propertyDescription": "this suite ...",
            "neighbourhoodDescription": "down in the slums..",
            "roomType": "single",
            "washroomType": "private",
            "genderPreference": "male",
            "pets": true,
            "utilities": true,
            "closestSchool": "bcit",
            "streetNumber": 1535,
            "street": "30th ave",
            "unitNumber": "5",
            "city": "vancouver",
            "province": "BC",
            "country": "Canada",
            "latitude": -125.235093235,
            "longitude": 49.2523535353,
            "images": [
                images.TEMPLATE_HOUSE1,
                images.TEMPLATE_HOUSE2,
                images.TEMPLATE_HOUSE3,
            ],
            "ownerId": 1,
            "tenants": [
                {
                    "userId": 3,
                    "firstName": "Mark",
                    "lastName": "Christian",
                    "gender": "male"
                },
                {
                    "userId": 3,
                    "firstName": "Molly",
                    "lastName": "Lena",
                    "gender": "male"
                }
            ],

        }
    }


    componentDidMount() {
        // let { id } = useParams();

        this.setState({
            // propertyId: id,
            // property: tempData //TODO: Replace this line by fetch call to backend.
        });
    }

    contextRef = createRef()

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    renderHostMessage() {
        const currentUser = auth.currentUserValue;
        const { property } = this.state;
        console.log('currentUser', currentUser)
        console.log('property', property)

        if (!currentUser) return null;
        if (currentUser.userId != property.ownerId) return null;

        let takenCount = property.tenants.length;
        let tableRows = [];
        property.tenants.forEach((tenant, key) => {
            tableRows.push(
                <Table.Row>
                    <Table.Cell collapsing>{tenant.firstName} {tenant.lastName}</Table.Cell>
                    <Table.Cell collapsing>{tenant.gender}</Table.Cell>
                </Table.Row>
            )
        })
        return (
            <div>
                <Message color='blue'>
                    {/* <Message.Header>Hi, {currentUser.firstName + ' ' + currentUser.lastName}</Message.Header> */}
                    <Header as="h3">Dear {currentUser.firstName}</Header>
                    <p>There are {takenCount} guests took this property.</p>
                    <Table className="my-3" color='blue' inverted>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>GuestName</Table.HeaderCell>
                                <Table.HeaderCell>Gender</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
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
        console.log(property)
        return (
            <div>
                <Container>
                    <div className="d-flex justify-content-between">
                        <div></div>
                        <Card className="mx-2">
                            <Card.Content>
                                <List divided relaxed>
                                    {property.utilities && this.renderListItem('wifi', 'Utilities Provided')}
                                    {!property.utilities && this.renderListItem('wifi', 'Utilities Not Provided')}
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

    renderForm() {
        return (
            <Formik
                initialValues={{ checkinDate: "", checkoutDate: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    if (!auth.currentUserValue) {
                        this.setState({ bookError: 'You have not logged in.' })
                        this.handleOpen();
                    }
                    if (!auth.currentUserValue.isTenant) {
                        this.setState({ bookError: 'You need a tenant account to book a room.' })
                        this.handleOpen();
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
                                <Button type="submit" >Book Now</Button>
                            </Form>
                        </div>
                    )
                }}

            </Formik>
        )
    }

    renderBookingBox() {
        let property = this.state.property;
        return (
            <div>
                <Header as="h3">$ {property.price} <span className="font-weight-light">/month</span></Header>
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
        let property = this.state.property;
        if (!this.state.property) {
            console.log(this.state.property)
            return (<div></div>)
        }
        return (
            <div>
                <CarouselComponent />
                {this.rendernapshotInfo()}
                <Grid >
                    <Grid.Column width="10">
                        <Ref innerRef={this.contextRef}>
                            <div>
                                {this.renderDivdingHeader('home', 'Room Information')}
                                <p>{property.propertyDescription}</p>
                                {this.renderDivdingHeader('id badge', 'Host Information')}
                                <p>{property.hostDescription}</p>
                                {this.renderDivdingHeader('home', 'Map')}
                                <Image src={images.TEMPLATE_IMAGE} />
                                {this.renderDivdingHeader('home', 'Points of Interests')}

                                <Rail position='right'>
                                    <Sticky active={true} context={this.contextRef}>
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

                <Modal >
                    <Modal.Header>Select a Photo</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
                        <Modal.Description>
                            <Header>Default Profile Image</Header>
                            <p>
                                We've found the following gravatar image associated with your e-mail
                                address.
                            </p>
                            <p>Is it okay to use this photo?</p>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>

        )
    }
}

export default PropertyPage;