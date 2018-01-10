import React, { Component } from 'react';
import {
  Nav,
  Navbar,
  NavItem
} from 'react-bootstrap';

import { Link } from 'react-router-dom';

const GuestNav = (props) => (
  <div>
    <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <img className="logo" src="../../images/logo.png" />
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem>
            <Link
              to="/login">
              Login
            </Link>
          </NavItem>
          <NavItem className="guest-signup">
            <Link
              to="/signup">
              Signup
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
  </div>
)

export default GuestNav;
