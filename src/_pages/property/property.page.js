import React, { Component, createRef } from 'react'
import { useParams } from 'react-router-dom'

import {
    Card, Grid, Container, List, Divider, Header, Icon, Button, Label, Form, Sticky, Rail,
    Ref, Segment, Image,
} from 'semantic-ui-react'
import { Formik } from 'formik'
import * as Yup from "yup"

import CarouselComponent from './carousel.component'
import * as images from '../../_constants/images'

class PropertyPage extends React.Component {

    tempData = {
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
        ]
    }

    state = {
        propertyId: null,
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
            ]
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
                    // submitting event here.

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



                <Grid columns="2">
                    <Grid.Column >
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
                                                <Card.Header>$ {property.price} <span className="font-weight-light">/month</span></Card.Header>
                                                <span className="font-weight-light">smaller text will go here.</span>
                                                <Divider></Divider>
                                                <Header as="p" block>
                                                    <Icon circular color='green' name='clipboard check' size='small' verticalalign='middle' />
                                                    Verified Host
                                                    <Header.Subheader>This host is verifed by HomeSafe by conducting host background check.</Header.Subheader>
                                                </Header>
                                                <Divider></Divider>
                                                {this.renderForm()}
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