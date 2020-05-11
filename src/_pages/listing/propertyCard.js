import React from 'react'

import { Card, Image, Icon, Grid } from 'semantic-ui-react'
import * as images from '../../_constants/images'


class PropertyCard extends React.Component {
    state = {
        property : this.props.property
    }

    item = {
        header: '',
        description: '',
        meta: '',
    };

    render() {
        if(!this.state.property) return <p></p>
        return (
            <Card >
                <Card.Content>
                    <Grid centered>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Image src={images.TEMPLATE_IMAGE} />
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card.Header>{this.state.property.unitNumber}</Card.Header>
                                <Card.Meta>
                                    <span >{this.state.property.roomType}</span>
                                </Card.Meta>
                                <Card.Description>
                                    {this.state.property.propertyDescription}
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