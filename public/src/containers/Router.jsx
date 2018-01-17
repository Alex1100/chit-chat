import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import GuestNav from '../components/GuestNav';
import UserNav from '../components/UserNav';
import Login from './Login';
import Signup from './Signup';
import TopicList from './TopicList';
import VideoRecorder from './VideoRecorder';
import VideoList from './VideoList';
import Video from '../components/Video';
import LandingPageParticles from './LandingPageParticles';


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
      topics,
      currentVideo,
      videos,
    } = this.props;

    return isAuthenticated ? (
      <Switch>
        <Route
          exact
          path="/">
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
        <Route
          exact
          path="/add-video">
          <div
            className="video-recorder-page">
            <VideoRecorder
              dispatch={dispatch}
              history={history}
              user={user}
              id={id}
              selectedTopic={selectedTopic}
            />
          </div>
        </Route>
        <Route
          exact
          path="/videos">
          <div
            className="video-list-page">
            <UserNav
              dispatch={dispatch}
              history={history}
              user={user}
            />
            <VideoList
              dispatch={dispatch}
              history={history}
              user={user}
              id={id}
              selectedTopic={selectedTopic}
            />
          </div>
        </Route>
        <Route
          exact
          path="/video-player">
          <div
            className="video-page">
            <UserNav
              dispatch={dispatch}
              history={history}
              user={user}
            />
            <Video
              dispatch={dispatch}
              history={history}
              user={user}
              userId={id}
              video={currentVideo}
            />
          </div>
        </Route>
      </Switch>
    ) : (
      <Switch>
        <Route
          exact
          path="/">
          <div>
            <GuestNav
              dispatch={dispatch}
              errorMessage={errorMessage}
              history={history}
            />
            <LandingPageParticles />
          </div>
        </Route>
        <Route
          exact
          path="/login">
          <div>
            <GuestNav
              dispatch={dispatch}
              errorMessage={errorMessage}
              history={history}
            />
            <Login
              dispatch={dispatch}
              errorMessage={errorMessage}
              history={history}
            />
          </div>
        </Route>
        <Route
          exact
          path="/signup">
          <div>
            <GuestNav
              dispatch={dispatch}
              errorMessage={errorMessage}
              history={history}
            />
            <Signup
              dispatch={dispatch}
              errorMessage={errorMessage}
              history={history}
            />
          </div>
        </Route>
      </Switch>
    );
  }
};


const mapStateToProps = (state) => {
  const {
    auth,
    topicsData,
    videoListData,
    videoData
  } = state;

  const {
    isAuthenticated,
    errorMessage,
    user,
    id,
    topics
  } = auth;

  const {
    videos,
  } = videoListData;

  const { currentVideo } = videoData;

  const { selectedTopic } = topicsData;

  return {
    topics,
    selectedTopic,
    isAuthenticated,
    errorMessage,
    user,
    id,
    videos,
    currentVideo,
  };
};

export default withRouter(connect(mapStateToProps)(Router));
