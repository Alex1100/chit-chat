import React, { Component } from 'react';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.video').parent().click(function() {
      if ($(this).children(".video").get(0).paused) {
        $(this).children(".video").get(0).play();
        $(this).children(".playpause").fadeOut();
      } else {
        $(this).children(".video").get(0).pause();
        $(this).children(".playpause").fadeIn();
      }
    })
  }

  render() {
    return (
      <div>
        <div className="video-comp-wrapper">
          <div className="video-wrapper">
            <video controls played className="video">
              <source type="video/webm" src={this.props.video.videoURL} />
            </video>
            <div className="playpause"></div>
          </div>
        </div>
        <br/>
        <div className="video-player-info-container">
          <label className="video-player-info-title">{this.props.video.title}</label>
          <p className="video-player-info-description">{this.props.video.description}</p>
          <p>Uploaded By: {this.props.user}</p>
        </div>
      </div>
    );
  }
};


export default VideoPlayer;
