import React, { Component } from 'react';
import { connect } from 'react-redux';
const RecordRTC = require('recordrtc');
import {
  updateRecorder,
  updateVideoDataURL,
  setVideo,
  updateTitleInput,
  updateDescriptionInput,
  updateTopicInput,
  updateImageURL,
  uploadVideo
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
    this.handleImageChange = this.handleImageChange.bind(this);
  }


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setVideo(document.querySelector('video')));
    $('#video').parent().click(function() {
      if ($(this).children("#video").get(0).paused) {
        $(this).children("#video").get(0).play();
        $(this).children(".playpause").fadeOut();
      } else {
        $(this).children("#video").get(0).pause();
        $(this).children(".playpause").fadeIn();
      }
    })
    $(".video-comp-wrapper").css('display', 'none');
    $(".video-comp-wrapper").css('visibility', 'hidden');
  }

  handleImageChange(e) {
    const { dispatch } = this.props;
    const reader = new FileReader();
    const file = e.target.files[0];
    let image;
    reader.onloadend = () => {
      image = reader.result;
      dispatch(updateImageURL(image));
    }
    reader.readAsDataURL(file);
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
        $(".video-comp-wrapper").css('display', 'block');
        $(".video-comp-wrapper").css('visibility', 'visible');
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
    } else if (name === "description") {
      dispatch(updateDescriptionInput(e.target.value));
    } else if (name === "topic") {
      dispatch(updateTopicInput(e.target.value));
    }
  }

  uploadVideo(e) {
    if (
      this.props.videoURL &&
      this.props.imageURL &&
      this.props.videoTopic
    ) {
      const {
        dispatch,
        history,
        id,
        videoURL,
        imageURL,
        videoTitle,
        videoDescription,
        videoTopic
      } = this.props;

      dispatch(
        uploadVideo(
          {
            userId: id,
            videoTopic,
            videoURL,
            videoTitle,
            videoDescription,
            videoTopic,
            imageURL,
            history
          }
        )
      );
    }
  }


  render() {
    const {
      videoTitle,
      videoDescription,
      videoTopic
    } = this.props;

    return (
      <div>
        <div className="video-comp-wrapper">
          <div className="video-wrapper">
            <video
              played
              poster
              id="video"
            />
            <div className="playpause"></div>
          </div>
        </div>
        <br/>
        <div
          className="video-controls">
          <button
            id="btn-start-recording"
            onClick={(e) => this.initRecording(e)}>
            <i class="fa fa-play-circle" aria-hidden="true"></i>
          </button>
          <button
            id="btn-stop-recording"
            onClick={() => this.endRecording()}>
            <i class="fa fa-stop-circle-o" aria-hidden="true"></i>
          </button>
        </div>
        <div
          className="video-info">
          <label
            className="video-title-label">
            Title
          </label>
          <input
            className="video-title-input"
            type="text"
            name="title"
            value={videoTitle}
            onChange={(e) => this.handleChange(e)}
          />
          <label
            className="video-topic-label">
            Topic
          </label>
          <input
            className="video-topic-input"
            type="text"
            name="topic"
            value={videoTopic}
            onChange={(e) => this.handleChange(e)}
          />
          <label
            className="video-description-label">
            Description
          </label>
          <input
            className="video-description-input"
            type="textarea"
            name="description"
            value={videoDescription}
            onChange={(e) => this.handleChange(e)}
          />
          <br/>
          <label className="file-upload-label">
            Add Thumbnail <i class="fa fa-picture-o" aria-hidden="true"></i>
          </label>
          <input
            className="image-upload"
            onChange={(e) => {e.preventDefault(); this.handleImageChange(e)}}
            type="file"
            name="video-picture"
          />
        </div>
        <div
          className="submit-vid-container">
          <button
            className="submit-vid-btn"
            onClick={(e) => {
              e.preventDefault();
              this.uploadVideo(e);
            }}>
            Upload <i class="fa fa-cloud-upload" aria-hidden="true"></i>
          </button>
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
    imageURL,
    videoTopic,
    message
  } = videoData;

  return {
    recorder,
    video,
    videoURL,
    videoTitle,
    videoDescription,
    imageURL,
    videoTopic,
    message
  };
};


export default connect(mapStateToProps)(VideoRecorder);
