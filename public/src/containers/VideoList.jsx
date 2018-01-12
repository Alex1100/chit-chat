import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoPreview from '../components/VideoPreview';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

class VideoList extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {
      videos,
      dispatch,
      history
    } = this.props;

    let videoBatches = [];

    for(let i = 0; i < videos.length; i+=3) {
      videoBatches.push([videos[i], videos[i+1], videos[i+2]]);
    }

    videoBatches = videoBatches.map(el => el.filter(z => z !== undefined))

    return videos.length > 0 ? (
      <div>
        <Grid>
        {
          videoBatches.map((vid, wi) => {
            return vid.length === 3 ? (
              <Row className="show-grid">
                <Col xs={4}>
                  <div className="video-list-container">
                    <VideoPreview
                      key={'vid_' + wi.toString() + '_0'}
                      dispatch={dispatch}
                      history={history}
                      videoId={vid[0].id}
                      title={vid[0].title}
                      thumbnail={vid[0].thumbnail}
                      description={vid[0].description}
                      videoURL={vid[0].content}
                      likes={vid[0].likes}
                    />
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="video-list-container">
                    <VideoPreview
                      key={'vid_' + wi.toString() + '_1'}
                      dispatch={dispatch}
                      history={history}
                      videoId={vid[1].id}
                      title={vid[1].title}
                      thumbnail={vid[1].thumbnail}
                      description={vid[1].description}
                      videoURL={vid[1].content}
                      likes={vid[1].likes}
                    />
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="video-list-container">
                    <VideoPreview
                      key={'vid_' + wi.toString() + '_2'}
                      dispatch={dispatch}
                      history={history}
                      videoId={vid[2].id}
                      title={vid[2].title}
                      thumbnail={vid[2].thumbnail}
                      description={vid[2].description}
                      videoURL={vid[2].content}
                      likes={vid[2].likes}
                    />
                  </div>
                </Col>
              </Row>
            ) : vid.length === 2 ? (
              <Row className="show-grid">
                <Col xs={4}>
                  <div className="video-list-container">
                    <VideoPreview
                      key={'vid_' + wi.toString() + '_0'}
                      dispatch={dispatch}
                      history={history}
                      videoId={vid[0].id}
                      title={vid[0].title}
                      thumbnail={vid[0].thumbnail}
                      description={vid[0].description}
                      videoURL={vid[0].content}
                      likes={vid[0].likes}
                    />
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="video-list-container">
                    <VideoPreview
                      key={'vid_' + wi.toString() + '_1'}
                      dispatch={dispatch}
                      history={history}
                      videoId={vid[1].id}
                      title={vid[1].title}
                      thumbnail={vid[1].thumbnail}
                      description={vid[1].description}
                      videoURL={vid[1].content}
                      likes={vid[1].likes}
                    />
                  </div>
                </Col>
              </Row>
            ) : vid.length === 1 ? (
              <Row className="show-grid">
                <Col xs={4}>
                  <div className="video-list-container">
                    <VideoPreview
                      key={'vid_' + wi.toString() + '_0'}
                      dispatch={dispatch}
                      history={history}
                      videoId={vid[0].id}
                      title={vid[0].title}
                      thumbnail={vid[0].thumbnail}
                      description={vid[0].description}
                      videoURL={vid[0].content}
                      likes={vid[0].likes}
                    />
                  </div>
                </Col>
              </Row>
            ) : null
          })
        }
      </Grid>
    </div>
    ) : (
      <div>
        <div className="app-loading-container">
          <h1 style={{color: "#fbee82", fontStyle: 'italic', fontSize: "120%"}}>Loading Videos</h1>
          <br/>
          <div className="loader">Loading Videos...</div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  const { videoListData } = state;
  const {
    videos,
    selectedVideo,
  } = videoListData;

  return {
    videos,
    selectedVideo,
  };
};


export default connect(mapStateToProps)(VideoList);
