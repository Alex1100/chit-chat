import React, { Component } from 'react';
import { connect } from 'react-redux';
const RecordRTC = require('recordrtc');
import {
  updateRecorder,
  updateVideoDataURL,
  setVideo,
  updateTitleInput,
  updateDescriptionInput
} from '../actions/video';


class VideoRecorder extends Component {
  constructor(props) {
    super(props);

    this.successCallback = this.successCallback.bind(this);
    this.captureCamera = this.captureCamera.bind(this);
    this.stopRecordingCallback = this.stopRecordingCallback.bind(this);
    this.initRecording = this.initRecording.bind(this);
    this.endRecording = this.endRecording.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadVideo = this.uploadVideo.bind(this);
  }


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setVideo(document.querySelector('video')));
  }


  successCallback(stream) {
    let recorder;
    const { dispatch } = this.props;

    const options = {
      mimeType: 'video/webm',
      bitsPerSecond: 192000
    };

    recorder = RecordRTC(stream, options);
    dispatch(updateRecorder(recorder));
    recorder.startRecording();
  }


  captureCamera() {
    navigator.getWebcam = (
      navigator.mediaDevices.getUserMedia ||
      navigator.webKitGetUserMedia ||
      navigator.moxGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );

    navigator.getWebcam({
      audio: true,
      video: true,
    })
    .then((stream) => this.successCallback(stream))
    .catch(error => {
      alert('Unable to capture your camera.');
      console.error(error);
    });
  }


  stopRecordingCallback() {
    const {
      dispatch,
      video,
      recorder
    } = this.props;

    recorder.stopRecording((audioVideoWebMURL) => {
      video.src = audioVideoWebMURL;
      const recordedBlob = recorder.getBlob();
      recorder.getDataURL(dataURL => {
        dispatch(updateVideoDataURL(dataURL));
      });
    });
  }

  initRecording(e) {
    const {
      video,
      recorder
    } = this.props;
    this.captureCamera();
  };


  endRecording() {
    this.stopRecordingCallback();
  }

  handleChange(e) {
    const name = e.target.name;
    const { dispatch } = this.props;
    if (name === "title") {
      dispatch(updateTitleInput(e.target.value));
    } else {
      dispatch(updateDescriptionInput(e.target.value));
    }
  }

  uploadVideo(e) {
    if (this.props.videoURL) {
      console.log("UPLOAD WORKS!!: ", this.props.videoURL);
    }
  }


  render() {
    const {
      videoTitle,
      videoDescription
    } = this.props;

    return (
      <div>
        <video controls played poster id="video"></video>
        <br/>
        <div className="video-controls">
          <button id="btn-start-recording" onClick={(e) => this.initRecording(e)}>Start Recording</button>
          <button id="btn-stop-recording" onClick={() => this.endRecording()}>Stop Recording</button>
        </div>
        <div className="video-info">
          <label className="video-title-label">Title</label>
          <input
            className="video-title-input"
            type="text"
            name="title"
            value={videoTitle}
            onChange={(e) => this.handleChange(e)}
          />
          <label className="video-description-label">Description</label>
          <input
            className="video-description-input"
            type="textarea"
            name="videoDescription"
            value={videoDescription}
            onChange={(e) => this.handleChange(e)}
          />
        </div>
        <div className="submit-vid-container">
          <button className="submit-vid-btn" onClick={(e) => {e.preventDefault(); this.uploadVideo(e)}}>Upload</button>
        </div>
      </div>
    );
  }
};


const mapStateToProps = (state) => {
  const { videoData } = state;
  const {
    recorder,
    video,
    videoURL,
    videoDescription,
    videoTitle,
  } = videoData;

  return {
    recorder,
    video,
    videoURL,
    videoTitle,
  };
};


export default connect(mapStateToProps)(VideoRecorder);
