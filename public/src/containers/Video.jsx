import React, { Component } from 'react';
import VideoPlayer from '../components/VideoPlayer';


class Video extends Component {
  constructor(props) {
    super(props);


  }



  render() {
    const { video } = this.props;
    return (
      <div>
        <VideoPlayer video={props.video}/>
        <div className="video-likes-container">
          <p>Likes go here</p>
        </div>
        <div className="video-comments-container">
          <p>Comments go here</p>
        </div>
      </div>
    );
  }
};

export default Video;
