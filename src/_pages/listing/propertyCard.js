import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import history from '../../history'

import { Card, Image, Icon, Grid, List, Divider } from 'semantic-ui-react'
import * as images from '../../_constants/images'
import './propertyCard.css';
import * as routes from '../../_constants/routes'




class PropertyCard extends React.Component {
    state = {
        property: this.props.property
    }

    constructor(props) {
        super(props)
        // this.handleClick = this.handleClick.bind(this)
    }

    item = {
        header: '',
        description: '',
        meta: '',
    };


    handleClick = (event) => {
        let location = routes.PROPERTY + '/' + this.state.property.propertyID
        console.log('move', location)
        event.preventDefault()
        history.push(location)
    }


    render() {
        if (!this.state.property) return <p></p>


        let text = this.state.property.propertyDescription
        return (
            <Card style={{ width: '100%' }} className='bgColour' onClick={this.handleClick}>
                <Card.Content>
                    <Card.Header>{this.state.property.unitNumber} {this.state.property.streetNumber} {this.state.property.street}</Card.Header>
                    <Card.Meta>
                        <Icon name='bed' />
                        <span className='date'>{this.state.property.roomType.toUpperCase()} ROOM</span>
                    </Card.Meta>
                </Card.Content>

                <Card.Content>
                    <Grid centered stackable>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Image src={images.TEMPLATE_IMAGE} />
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card.Description>
                                    <List relaxed>
                                        {this.state.property.wifiAndUtilitiesIncluded && <List.Item icon='wifi' content='Wifi Included' />}
                                        {this.state.property.genderPreference.toUpperCase() == 'MALE' && <List.Item icon='man' content='Male Only' />}
                                        {this.state.property.genderPreference.toUpperCase() == 'FEMALE' && <List.Item icon='woman' content='Female Only' />}
                                        <List.Item icon='paw' content='Pets Allowed' />
                                    </List>
                                    <Divider></Divider>
                                    {/* {this.state.property.propertyDescription} */}
                                    {text.length < 45 ? text : text.slice(0, 45) + ' ...'}
                                </Card.Description>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>

            </Card>
        )
    }
}

export default PropertyCard