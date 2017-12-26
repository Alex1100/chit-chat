import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import GuestNav from '../components/GuestNav';
import UserNav from '../components/UserNav';
import Login from './Login';
import Signup from './Signup';
import VideoChatBox from './VideoChatBox';


class Router extends Component {

  render() {
    const { dispatch, errorMessage, history, user, id } = this.props;
    return this.props.isAuthenticated === false || this.props.isAuthenticated === undefined ? (
      <Switch>
        <Route exact path="/">
          <div>
            <GuestNav
              dispatch={dispatch}
              errorMessage={errorMessage}
              history={history}
            />
          </div>
        </Route>
        <Route exact path="/login">
          <Login
            dispatch={dispatch}
            errorMessage={errorMessage}
            history={history}
          />
        </Route>
        <Route exact path="/signup">
          <Signup
            dispatch={dispatch}
            errorMessage={errorMessage}
            history={history}
          />
        </Route>
      </Switch>
    ) : (
      <Switch>
        <Route exact path="/">
          <div>
            <UserNav
              dispatch={dispatch}
              history={history}
              user={user}
            />
            <VideoChatBox
              dispatch={dispatch}
              history={history}
              user={user}
              id={id}
            />
          </div>
        </Route>
      </Switch>
    )
  }
};


const mapStateToProps = (state) => {
  const { auth } = state;
  const { isAuthenticated, errorMessage, user, id } = auth;
  return {
    isAuthenticated,
    errorMessage,
    user,
    id,
  };
};

export default withRouter(connect(mapStateToProps)(Router));
