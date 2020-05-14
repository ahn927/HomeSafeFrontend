import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'

import * as routes from '../_constants/routes'

import auth from '../_services/auth'

class Navbar extends React.Component {
    state = {
        currentUser: auth.currentUserValue,
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    // handleLogin = (e) => this.props.history.push("/login")
    handleLogout = (e) => {
        auth.logout()
        window.location.reload()
    }

    componentDidUpdate() {
        this.setState({ currentuser: auth.currentUserValue })
    }

    render() {
        const { activeItem } = this.state
        let currentUser = this.state.currentUser
        return (
            <div className='my-5'>
                <Menu stackable size='large'>
                    <Menu.Item
                        header
                        name='HomeSafe'
                        active={activeItem === 'HomeSafe'}
                        onClick={this.handleItemClick}
                        href={routes.HOME}
                    />
                    <Menu.Item
                        name='Our Story'
                        active={activeItem === 'Our Story'}
                        onClick={this.handleItemClick}
                        href={routes.ABOUTUS}
                    />

                    <Menu.Item
                        name='FAQ'
                        active={activeItem === 'faq'}
                        onClick={this.handleItemClick}
                        href={routes.FAQ}
                    />

                    <Menu.Item
                        name='reviews'
                        active={activeItem === 'reviews'}
                        onClick={this.handleItemClick}
                        href={routes.REVIEWS}
                    />

                    <Menu.Menu position='right'>
                        {
                            <Menu.Item
                                name='Book a Room'
                                active={activeItem === 'bookAroom'}
                                onClick={this.handleItemClick}
                                href={routes.LISTING}
                            >
                            </Menu.Item>
                        }
                        {
                            // User logged-in already & display user's name
                            currentUser &&
                            <Menu.Item
                                name='currentuserName'
                                href={routes.DASHBOARD}
                            >
                                <Icon name='user' />
                                {`${currentUser.firstName} ${currentUser.lastName}`}
                            </Menu.Item>
                        }
                        {
                            // User logged-in already & display logout button
                            currentUser &&
                            <Menu.Item
                                name='logout'
                                active={activeItem === 'logout'}
                                onClick={this.handleLogout}
                            />
                        }
                        {
                            // User not logged-in & disaply become host button
                            !currentUser &&
                            <Menu.Item
                                name='becomeHost'
                                active={activeItem === 'becomeHost'}
                                href={routes.BECOME_HOST}
                            />
                        }
                        {
                            // User not logged-in & disaply login button
                            !currentUser &&
                            <Menu.Item
                                name='login'
                                active={activeItem === 'login'}
                                href={routes.LOGIN}
                            />
                        }



                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}

export default Navbar