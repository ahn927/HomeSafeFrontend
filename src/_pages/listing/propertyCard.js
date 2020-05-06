import React from 'react'

import { Card, Image, Icon, Grid } from 'semantic-ui-react'
import * as images from '../../_constants/images'


class PropertyCard extends React.Component {
    item = {
        header: '',
        description: '',
        meta: '',
    };

    render() {
        let property = this.props.property;
        return (
            <Card >
                <Card.Content>
                    <Grid centered>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Image src={images.TEMPLATE_IMAGE} />
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card.Header>{property.address}</Card.Header>
                                <Card.Meta>
                                    <span >{property.roomType}</span>
                                </Card.Meta>
                                <Card.Description>
                                    Wifi, private bathroom, no pets, female only.
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