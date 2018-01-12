import React, { Component } from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  Button
} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/auth';
import { clearSearch } from '../actions/search';
import SearchBar from '../containers/SearchBar';


const UserNav = (props) => (
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">
            <img className="logo" src="../../images/logo.png" />
          </Link>
          <br/>
          <h3>{props.user} <span className="glyphicon glyphicon-user"></span></h3>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem>
          <Link
            to="/"
            onClick={() => props.dispatch(
              logoutUser(
                props.history
              )
            )}>
            Logout
          </Link>
        </NavItem>
        <SearchBar
          dispatch={props.dispatch}
          history={props.history}
        />
        <NavItem
          className="clearSearch">
          <Button
            className="clear-search-btn"
            onClick={(e) => {
              e.preventDefault();
              props.dispatch(
                clearSearch()
              );
            }}>
            Clear Search
          </Button>
        </NavItem>
      </Nav>
    </Navbar>
  </div>
);

export default UserNav;
