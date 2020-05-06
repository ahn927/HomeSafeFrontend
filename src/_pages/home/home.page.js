import React from 'react'

import { Divider, Header, Icon, Table, Grid, Image, Button } from 'semantic-ui-react'

import auth from '../../_services/auth'
import Search from '../../_components/search'
import AccordionComponent from './accordion'
import * as Images from '../../_constants/images';

class HomePage extends React.Component {

    state = {
        searchValue: null,
    }

    renderDivider(icon, text) {
        return (
            <Divider horizontal className='my-4'>
                <Header as='h4'>
                    <Icon name={icon} />
                    {text}
                </Header>
            </Divider>
        )
    }

    renderHowItWorks() {
        return(
            <Grid container stackable verticalAlign='middle'>
                <Grid.Row>
                <Grid.Column floated='right' width={6}>
                        <Image bordered rounded size='large' src={Images.TEMPLATE_IMAGE} />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                        How It Works
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            We can give your company superpowers to do things that they never thought possible.
                            Let us delight your customers and empower your needs... through pure data analytics.
                       
                        </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    renderWhyBookWithUs() {
        return (
            <Grid container stackable verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            We Help Companies and Companions
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            We can give your company superpowers to do things that they never thought possible.
                            Let us delight your customers and empower your needs... through pure data analytics.
                       
                        </p>
                    </Grid.Column>
                    <Grid.Column floated='right' width={6}>
                        <Image bordered rounded size='large' src={Images.TEMPLATE_IMAGE} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    render() {
        return (
            <div>
                <h1>Home page</h1>
                {/* <Search onClickSearch={this.handleSearch} /> */}
                {this.renderDivider('', '')}
                {this.renderHowItWorks()}
                {this.renderDivider('tag', 'Why Book With Us')}
                {this.renderWhyBookWithUs()}
                {this.renderDivider('tag', 'Reviews')}

                {this.renderDivider('tag', 'FAQs')}
                <AccordionComponent />


            </div>
        );
    }
}

export default HomePage;