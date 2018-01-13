import React, { Component } from 'react';
import { connect } from "react-redux";
import Topic from "../components/Topic";
import {
  addTopic,
  inputTopic
} from "../actions/topic";

import Particles from 'reactparticles.js';


import {
  updateVideoList,
  updateVideoRequest,
  updateVideoFailure,
  grabVideos
} from '../actions/videoList';

import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Nav,
  NavItem,
  Button,
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import SearchBar from './SearchBar';


class TopicsList extends Component {
  constructor(props) {
    super(props);

    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.addNewTopic = this.addNewTopic.bind(this);
    this.getVideos = this.getVideos.bind(this);
    this.splitUp = this.splitUp.bind(this);
  }

  componentDidMount() {
    let el = document.getElementById("particles-js-tile-2-particles");
    el.style['top'] = "180px";
    el.style['height'] = "24%";
  }

  splitUp(arr, n) {
    let rest = arr.length % n,
        restUsed = rest,
        partLength = Math.floor(arr.length / n),
        result = [];

    for(let i = 0; i < arr.length; i += partLength) {
      let end = partLength + i, add = false;

      if(rest !== 0 && restUsed) {
        end++;
        restUsed--;
        add = true;
      }

      result.push(arr.slice(i, end));

      if(add) {
        i++;
      }
    }

    return result;
  }

  getVideos() {
    const {
      dispatch,
      history
    } = this.props;

    dispatch(grabVideos(history));
  }

  handleTopicChange(e) {
    const { dispatch } = this.props;
    dispatch(inputTopic(e.target.value));
  }

  addNewTopic() {
    const {
      dispatch,
      history,
      newTopic
    } = this.props;

    dispatch(addTopic(newTopic, history));
  }


  render() {
    const {
      topics,
      selectedTopic,
      newTopic,
      dispatch,
      history
    } = this.props;

    let splitTopics = this.splitUp(topics.map(el => el.name), 4);

    console.log("SPLIT TOPICS ARE: ", splitTopics);

    return topics ? (
      <div>
        <Particles
          id="tile-2-particles"
          config="../../../src/utils/particles-two.json"
        />
        <div
          className="topics-list">
          <div
            className="topics-add-container">
            <label
              className="topics-add-label">
              Add New Topic
            </label>
            <input
              className="topics-add-input"
              type="text"
              onChange={(e) => {
                e.preventDefault();
                this.handleTopicChange(e);
              }}
              name="newTopic"
              value={newTopic}
            />
            <button
              className="topics-add-btn"
              type="submit"
              onClick={(e) => {
                e.preventDefault;
                this.addNewTopic();
              }}>
              Add Topic
            </button>
          </div>
          <br/>
          <div
            className="add-video-link">
            <Nav
              bsStyle="tabs">
              <NavItem>
                <Link
                  to="/add-video">
                  +Video
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/random-topic">
                  RND Topic
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    this.getVideos();
                  }}
                  to="/videos">
                  Videos
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    this.getVideos();
                  }}
                  to="/videos">
                  RND Video
                </Link>
              </NavItem>
            </Nav>
          </div>
          <h1
            className="topics-header">
            All Topics
          </h1>
          <Grid>
            <Row>
              {
                splitTopics.map((el, wi) => (
                  <Col xs={3} md={3}>
                  {
                    el.map((z, gi) => (
                      <Row key={'row_' + wi.toString() + gi.toString()}>
                        <Col key={'col_' + wi.toString() + gi.toString()} xs={3} md={3}>
                          <Topic
                            className="topic-item"
                            dispatch={dispatch}
                            history={history}
                            key={'topic_' + wi.toString() + gi.toString()}
                            name={z}
                          />
                        </Col>
                      </Row>
                    ))
                  }
                  </Col>
                ))
              }
            </Row>
          </Grid>
        </div>
      </div>
    ) : (
      <div>
        <Particles
          id="tile-2-particles"
          config="../../../src/utils/particles-two.json"
        />
        <div
          className="topics-list">
          <div
            className="topics-add-container">
            <label>
              Add New Topic
            </label>
            <input
              type="text"
              onChange={(e) => {
                e.preventDefault();
                this.handleTopicChange(e);
              }}
              name="newTopic"
              value={newTopic}
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault;
                this.addNewTopic();
              }}>
            </button>
          </div>
          <br/>
        </div>
      </div>
    );
  }
};


const mapStateToProps = (state) => {
  const { topicsData } = state;
  const {
    selectedTopic,
    newTopic
  } = topicsData;

  return {
    selectedTopic,
    newTopic,
  };
}


export default connect(mapStateToProps)(TopicsList);
