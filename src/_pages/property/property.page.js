import React, { Component, createRef } from 'react'

import {
    Card, Grid, Container, List, Divider, Header, Icon, Button, Label, Form, Sticky, Rail,
    Ref,
} from 'semantic-ui-react'
import { Formik } from 'formik'
import * as Yup from "yup"

import CarouselComponent from './carousel.component'
import * as images from '../../_constants/images'

class PropertyPage extends React.Component {

    // state = {
    //     propertyId: null
    // }

    // componentDidMount() {
    //     let { id } = useParams();
    //     this.setState({ propertyId: id });
    // }

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

        return (
            <div>
                <Container>
                    <div class="d-flex justify-content-between">
                        <div></div>
                        <Card className="mx-2">
                            <Card.Content>
                                <List divided relaxed>
                                    {this.renderListItem('wifi', 'Wifi Provided')}
                                </List>
                            </Card.Content>
                        </Card>
                        <Card className="mx-2">
                            <Card.Content>
                                <List divided relaxed>
                                    {this.renderListItem('bed', 'Private Room')}
                                    {this.renderListItem('bath', 'Private Bathroom')}
                                </List>
                            </Card.Content>
                        </Card>
                        <Card className="mx-2">
                            <Card.Content>
                                <List divided relaxed>
                                    {this.renderListItem('paw', 'Pets Allowed')}
                                </List>
                            </Card.Content>
                        </Card>
                        <Card className="mx-2">
                            <Card.Content>
                                <List divided relaxed>
                                    {this.renderListItem('female', 'Female Only')}
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
            <Header icon={icon} as='h3' dividing>
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
                        .required("No password provided.")
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
        return (
            <div>
                <CarouselComponent />
                {this.rendernapshotInfo()}

                <Container>
                    <Ref innerRef={this.contextRef}>

                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={10}>

                                    {this.renderDivdingHeader('home', 'Room Information')}
                            4 fully furnished rooms in shared home in Fort Langley available for rent. The home is on acreage with plenty of space for outdoor activities and is a short distance from Fort Langley. Master Bedroom is available and has en suite. Close to Trinity Western University, Walnut grove, and Golden Ears Bridge. Nearby schools include Topham Elementary, Ecole des Voyageurs, Alex Hope Elementary, and Walnut Grove Secondary School. Nearest public transit is a 20 minute walk.
                            {this.renderDivdingHeader('id badge', 'Host Information')}
                            4 fully furnished rooms in shared home in Fort Langley available for rent. The home is on acreage with plenty of space for outdoor activities and is a short distance from Fort Langley. Master Bedroom is available and has en suite. Close to Trinity Western University, Walnut grove, and Golden Ears Bridge. Nearby schools include Topham Elementary, Ecole des Voyageurs, Alex Hope Elementary, and Walnut Grove Secondary School. Nearest public transit is a 20 minute walk.
                            {this.renderDivdingHeader('home', 'Map')}
                                    <img src={images.TEMPLATE_IMAGE} />
                                    {this.renderDivdingHeader('home', 'Points of Interests')}

                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <Rail>
                                        <Sticky context={this.contextRef}>
                                            <Card className="mt-3">
                                                <Card.Content>
                                                    <Card.Header>$1000 <span className="font-weight-light">/month</span></Card.Header>
                                                    <span className="font-weight-light">smaller text will go here.</span>
                                                    <Divider></Divider>


                                                    <Header as="p" block>
                                                        <Icon Icon circular color='green' name='clipboard check' size='small' verticalAlign='middle' />
                                        Verified Host
                                        <Header.Subheader>This host is verifed by HomeSafe by conducting host background check.</Header.Subheader>
                                                    </Header>
                                                    <Divider></Divider>
                                                    {this.renderForm()}
                                                </Card.Content>
                                            </Card>
                                        </Sticky>
                                    </Rail>


                                </Grid.Column>

                            </Grid.Row>
                        </Grid>
                    </Ref>

                </Container>
            </div>

        )
    }
}

export default PropertyPage;