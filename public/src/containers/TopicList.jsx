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
    this.getVideos = this.getVideos.bind(this);
    this.splitUp = this.splitUp.bind(this);
  }

  componentDidMount() {
    let el = document.getElementById("particles-js-tile-2-particles");
    el.style['top'] = "150px";
    el.style['height'] = "25%";
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


  render() {
    const {
      topics,
      selectedTopic,
      dispatch,
      history
    } = this.props;

    let splitTopics = this.splitUp(topics.map(el => el.name), 4);

    return topics ? (
      <div>
        <Particles
          id="tile-2-particles"
          config="../../../src/utils/particles-two.json"
        />
        <div
          className="topics-list">
          <div
            className="add-video-link">
            <Nav
              bsStyle="tabs">
              <NavItem>
                <Link
                  to="/add-video">
                  Record <i class="fa fa-video-camera" aria-hidden="true"></i>
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/random-topic">
                  <i class="fa fa-random" aria-hidden="true"></i> Topic
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
                  <i class="fa fa-random" aria-hidden="true"></i> Video
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
        </div>
      </div>
    );
  }
};


const mapStateToProps = (state) => {
  const { topicsData } = state;
  const {
    selectedTopic,
  } = topicsData;

  return {
    selectedTopic,
  };
}


export default connect(mapStateToProps)(TopicsList);
