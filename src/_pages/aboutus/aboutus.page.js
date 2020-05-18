import React from 'react'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Image,
    Segment,
} from 'semantic-ui-react'
import PageHeader from '../../_components/pageHeader'
import InstagramGallery from '../../_components/instagramGallery/InstagramGallery'
import * as images from '../../_constants/images'
import * as routes from '../../_constants/routes'

const INSTAGRAM_ID = "3468531814";
const THUMBNAIL_WIDTH = 640;
const PHOTO_COUNT = 10;

class Aboutus extends React.Component {

    render() {
        return (
            <div>
                <Segment style={{ padding: '8em 0em' }} vertical>
                    <PageHeader
                        icon={null}
                        text='OurStory' >
                    </PageHeader>
                    <Grid container stackable verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Header as='h3' style={{ fontSize: '2em' }}>
                                    {/* What is Lorem Ipsum? */}
                                </Header>
                                <p style={{ fontSize: '1.33em' }}>
                                    Our story began with one goal, to provide students and young professionals access to affordable housing offered by vetted hosts.
                                    Half of our team own their own homes, so we understand that homeownership costs in the Lower Mainland are expensive and ever growing. After seeing inconsistent (and at times disastrous) results from traditional short-term rentals options, we knew there was a better alternative. We wanted a reliable way to rent a room in our home to vetted and respectful guests, with no hidden fees, so we worked to make that happen.
                                    <br /><br />The rest of our team are students and young professionals. After getting tired of renting low quality housing at record high prices, we set out to create a platform that could give us access to what we needed: a nice room provided by a friendly host at a price we could actually afford. Enter HomeSafe, a user friendly site that can show you room listings close by your campus or office, and the best part is all rooms are provided by vetted hosts at fixed, below market rates.
                                    <br /><br />Having experience on both sides of the owner/renter equation has provided us the insight to deliver a win-win outcome by allowing homeowners to increase their monthly cash flow while providing students and young professionals access to secure and affordable housing. So whether you are a prospective host or guest welcome, and get HomeSafe.
                                </p>
                                {/* <Header as='h3' style={{ fontSize: '2em' }}>
                                    Where can I get some
                                </Header>
                                <p style={{ fontSize: '1.33em' }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p> */}
                            </Grid.Column>
                            {/* <Grid.Column floated='right' width={6}>
                                <Image bordered rounded size='large' src={images.TEMPLATE_IMAGE} />
                            </Grid.Column> */}
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column textAlign='center'>
                                <Button size='huge' href={routes.LISTING}>Book A Room</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>

                {/* <Segment style={{ padding: '0em' }} vertical>
                    <Grid celled='internally' columns='equal' stackable>
                        <Grid.Row textAlign='center'>
                            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                                <Header as='h3' style={{ fontSize: '2em' }}>
                                    "Safe Lorem Ipsum Lorem Ipsum"
                                </Header>
                                <p style={{ fontSize: '1.33em' }}>Lorem Ipsum Lorem Ipsum Lorem Ipsum.</p>
                            </Grid.Column>
                            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                                <Header as='h3' style={{ fontSize: '2em' }}>
                                    "HomeSafe is awesome."
                                </Header>
                                <p style={{ fontSize: '1.33em' }}>
                                    <Image avatar src={images.TEMPLATE_IMAGE} />
                                    <b>Nan</b> International Student at UBC
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment> */}

                <Segment style={{ padding: '8em 0em' }} vertical>
                    <Container text>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            Become A Host
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <Button as='a' size='large' href={routes.BECOME_HOST}>
                            Become A Host
                        </Button>

                        <Divider
                            as='h4'
                            className='header'
                            horizontal
                            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                        >
                            <p>Reviews</p>
                        </Divider>

                        <p style={{ fontSize: '1.33em' }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

                        </p>
                        <InstagramGallery
                            userId={INSTAGRAM_ID}
                            thumbnailWidth={THUMBNAIL_WIDTH}
                            photoCount={PHOTO_COUNT}
                        />
                        <Button as='a' size='large' href={routes.REVIEWS} >
                            Reviews
                        </Button>
                    </Container>
                </Segment>

            </div>
        )
    }
}

export default Aboutus