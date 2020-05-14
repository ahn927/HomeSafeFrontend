import React, { Component } from 'react'
import {
    Container,
    Grid,
    Header,
    Icon,
    Segment,
    Button,
    Divider
} from 'semantic-ui-react'

class PageHeader extends React.Component {

    render() {
        let icon = this.props.icon;
        let text = this.props.text;
        return (
            <div>
                <Divider
                    as='h4'
                    className='header'
                    horizontal
                    style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                >
                    <p>{text}</p>
                </Divider>

                {this.props.children && <Grid className="mb-3">
                    <Grid.Row>
                        <Grid.Column textAlign='center'>
                            <div style={{ fontSize: '1.33em' }}>
                                {this.props.children}
                            </div>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>}
            </div>
        )
    }
}

export default PageHeader