
import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../store/layout/layout.actions';
import NavButton from "./NavButton";
import NavMenu from "./NavMenu";

class MegaMenu extends Component {
    navItems = [
    {
        name: 'Energy',
        icon: 'fa-wrench',
        route: '/account',
        children: [
            {
                name: 'Change Password',
                icon: 'fa-unlock',
                route: '/account/password'
            },
            {
                name: 'Another Parent',
                icon: 'fa-credit-card',
                route: '/account/payment',
                children: [
                    {
                        name: 'Payment Settings',
                        icon: 'fa-credit-card',
                        route: '/account/payment',
                    },
                    {
                        name: 'Yet Another Parent',
                        icon: 'fa-credit-card',
                        route: '/account/payment',
                        children: [
                            {
                                name: 'Payment Settings',
                                icon: 'fa-credit-card',
                                route: '/account/payment',
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Transaction History',
                icon: 'fa-history',
                route: '/account/history'
            }
        ]
    },
    {
        name: 'Shops',
        icon: 'fa-car',
        route: '/counter'
    },
    {
        name: 'Travel',
        icon: 'fa-money',
        route: '/features/currency'
    }];

    componentWillMount(){
        this.props.initialize(this.navItems);
    }
    backButton(){
        console.log(this.props);
        if(this.props.layout.previousNavItems.length > 0 && this.props.layout.navButtonActive){
            return (
                <div className="navbar-header">
                    <a className="navbar-brand" onClick={(e) => this.props.menuBack()}>Back</a>
                </div>
            )
        }

    }
    render() {
        const divStyle = {
            marginBottom: 75
        }
        return (
            <div style={divStyle}>
                <Navbar className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        {this.backButton()}

                        <Navbar.Header className="navbar-header">
                            <Navbar.Brand className="navbar-brand navbar-title text-center center-block">
                                <a href="/">{
                                    this.props.layout.navButtonActive
                                        ? <span>Menu</span>
                                        : <img height="30px" src="//d33972ka1dfc7m.cloudfront.net/assets/logos/resolver-logo@2x-8173001a85befeb22856f5e095cc95794e9fc2f3e58e67bed3494406dd7ce0fb.png" alt="Resolver"/>}
                                </a>
                            </Navbar.Brand>
                            <NavButton active={this.props.layout.navButtonActive} toggle={(e) => this.props.toggleNav()}/>
                        </Navbar.Header>
                    </div>
                </Navbar>
                <NavMenu onActivate={this.props.menuItemActivate} items={this.props.layout.currentNavItems} open={this.props.layout.navButtonActive}/>
            </div>

        );
    }

}


function mapStateToProps(state) {
    return {
        layout: state.layout
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MegaMenu);