import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import GuestNav from '../components/GuestNav';
import UserNav from '../components/UserNav';
import Login from './Login';
import Signup from './Signup';
import VideoChatBox from './VideoChatBox';
import TopicList from './TopicList';


class Router extends Component {

  render() {

    const {
      dispatch,
      isAuthenticated,
      errorMessage,
      history,
      user,
      id,
      selectedTopic,
      topics
    } = this.props;

    return isAuthenticated ? (
      <Switch>
        <Route exact path="/">
          <div>
            <UserNav
              dispatch={dispatch}
              history={history}
              user={user}
            />
            <TopicList
              dispatch={dispatch}
              history={history}
              user={user}
              topics={topics}
              id={id}
            />
          </div>
        </Route>
        <Route exact path="/chat">
          <div>
            <VideoChatBox
              dispatch={dispatch}
              history={history}
              user={user}
              selectedTopic={selectedTopic}
              id={id}
            />
          </div>
        </Route>
      </Switch>
    ) : (
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
    )
  }
};


const mapStateToProps = (state) => {
  const { auth, topicsData } = state;
  const { isAuthenticated, errorMessage, user, id, topics } = auth;
  const { selectedTopic } = topicsData;
  return {
    topics,
    selectedTopic,
    isAuthenticated,
    errorMessage,
    user,
    id,
  };
};

export default withRouter(connect(mapStateToProps)(Router));
