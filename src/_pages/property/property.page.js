import React from 'react'

import { Card, Grid, Container, List, Divider, Header, Icon, Button } from 'semantic-ui-react'

import CarouselComponent from './carousel.component'

class PropertyPage extends React.Component {

    // state = {
    //     propertyId: null
    // }

    // componentDidMount() {
    //     let { id } = useParams();
    //     this.setState({ propertyId: id });
    // }

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

    render() {
        return (
            <div>
                <CarouselComponent />
                {this.rendernapshotInfo()}

                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderDivider('home', 'Room Information')}
                            {this.renderDivider('id badge', 'Host Information')}

                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Card>
                                <Card.Content>
                                    <Card.Header>$1000 <span className="font-weight-light">/month</span></Card.Header>
                                    <span className="font-weight-light">smaller text will go here.</span>
                                    <Divider></Divider>
                                    <List>
                                        <List.Item>
                                            <List.Icon circular color='green' name='clipboard check' size='large' verticalAlign='middle' />
                                        </List.Item>
                                        <List.Item>
                                            <List.Content>
                                                <List.Header>Verified Host</List.Header>
                                                <List.Description >This host is verifed by HomeSafe by conducting host background check.</List.Description>
                                            </List.Content>
                                        </List.Item>
                                    </List>
                                    <Divider></Divider>

                                    <Button>Book Now</Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </div>

        )
    }
}

export default PropertyPage;