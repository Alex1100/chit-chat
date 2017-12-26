import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/auth';

const UserNav = (props) => (
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Hey {props.user}!</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem><Link to="/" onClick={() => props.dispatch(logoutUser(props.history))}>Logout</Link></NavItem>
      </Nav>
    </Navbar>
  </div>
)

export default UserNav;
