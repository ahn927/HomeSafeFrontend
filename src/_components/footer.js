import React, { Component } from 'react'
import {
    Container,
    Grid,
    Header,
    List,
    Segment,
} from 'semantic-ui-react'
import * as routes from '../_constants/routes'

class Footer extends React.Component {
    render() {
        return (
            <Segment inverted vertical style={{ padding: '5em 0em' }} className="mt-5">
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>

                            {/* TODO: replace this template text */}
                            <Grid.Column width={3}>
                                {/* <Header inverted as='h4' content='About' /> */}
                                <List link inverted>
                                    <List.Item as='a' href={routes.ABOUTUS} >Our Story</List.Item>
                                    <List.Item as='a' href={routes.FAQ} >FAQ</List.Item>
                                    <List.Item as='a' href={routes.REVIEWS} >Reviews</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                {/* <Header inverted as='h4' content='Services' /> */}
                                <List link inverted>
                                    <List.Item as='a' href={routes.LISTING} >Book A Room</List.Item>
                                    <List.Item as='a' href={routes.BECOME_HOST} >Become A Host</List.Item>
                                    <List.Item as='a' href={routes.LOGIN} >User Login</List.Item>

                                    {/* <List.Item as='a'>How To Access</List.Item>
                                    <List.Item as='a'>Favorite X-Men</List.Item> */}
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header as='h4' inverted>
                                    Home Safe
                                </Header>
                                <p>
                                    Peace of mind for you, and your wallet. Browse affordable room listings by vetted hosts.
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        )
    }
}

export default Footer