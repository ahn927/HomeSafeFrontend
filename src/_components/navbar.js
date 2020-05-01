import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'

import auth from '../_services/auth'

class Navbar extends React.Component {
    state = {
        currentUser: auth.currentUserValue,
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    // handleLogin = (e) => this.props.history.push("/login")
    hnadleLogout = (e) => {
        auth.logout()
        this.props.history.push("/")
    }

    componentDidUpdate() {
        this.setState({ currentuser: auth.currentUserValue })
        console.log('yo')
    }

    render() {
        const { activeItem } = this.state
        let currentUser = this.state.currentUser
        return (
            <div>
                <Menu stackable size='large'>
                    <Menu.Item header>HomeSafe</Menu.Item>
                    <Menu.Item
                        name='aboutUs'
                        active={activeItem === 'aboutUs'}
                        onClick={this.handleItemClick}
                        href='/'
                    />
                    <Menu.Item
                        name='jobs'
                        active={activeItem === 'jobs'}
                        onClick={this.handleItemClick}
                        href='/'
                    />
                    <Menu.Item
                        name='locations'
                        active={activeItem === 'locations'}
                        onClick={this.handleItemClick}
                        href='/'
                    />
                    <Menu.Menu position='right'>
                        {
                            currentUser &&
                            <Menu.Item name='currentuserName'>
                                <Icon name='user' />
                                {`${currentUser.firstName} ${currentUser.lastName}`}
                            </Menu.Item>
                        }
                        {
                            currentUser &&
                            <Menu.Item
                                name='logout'
                                active={activeItem === 'logout'}
                                onClick={this.hnadleLogout}
                            // href='/login'
                            />
                        }
                        {
                            !currentUser &&
                            <Menu.Item
                                name='login'
                                active={activeItem === 'login'}
                                onClick={this.handleLogin}
                                href='/login'
                            />
                        }



                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}

export default Navbar