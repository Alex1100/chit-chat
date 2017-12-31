import React, { Component } from 'react';
import { connect } from 'react-redux';
var RecordRTC = require('recordrtc');
import { updateRecorder, setVideo } from '../actions/video';


class VideoRecorder extends Component {
  constructor(props) {
    super(props);
    this.successCallback = this.successCallback.bind(this);
    this.captureCamera = this.captureCamera.bind(this);
    this.stopRecordingCallback = this.stopRecordingCallback.bind(this);
    this.initRecording = this.initRecording.bind(this);
    this.endRecording = this.endRecording.bind(this);
  }


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setVideo(document.querySelector('video')));
  }


  successCallback(stream) {
    // RecordRTC usage goes here
    const { dispatch } = this.props;

    let recorder;
    if (this.props.recorder) {
      recorder = this.props.recorder;
    }


    const options = {
      mimeType: 'video/webm',
      bitsPerSecond: 192000
    };

    recorder = RecordRTC(stream, options);
    console.log("RECORDER BEFORE UPDATING IS: ", recorder);
    dispatch(updateRecorder(recorder));
    console.log("RECORDER AFTER UPDATE: ", recorder);
    recorder.startRecording();
    console.log("STREAM SHOULD BE: ", stream);
  }


  captureCamera() {
    console.log("RECORDER IS: ", this.props.recorder);
    navigator.getWebcam = (navigator.mediaDevices.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    navigator.getWebcam({
      audio: true,
      video: true
    })
    .then((stream) => this.successCallback(stream))
    .catch(error => {
      alert('Unable to capture your camera. Please check console logs.');
      console.error(error);
    });
  }


  stopRecordingCallback() {
    const { video, recorder } = this.props;
    recorder.stopRecording((audioVideoWebMURL) => {
      video.src = audioVideoWebMURL;
      document.getElementById('btn-stop-recording').disabled = false;
      console.log("AUDIO SOURCE IS: ", audioVideoWebMURL);
      var recordedBlob = recorder.getBlob();
      console.log("RECORDED BLOB IS: ", recordedBlob);
      recorder.getDataURL(dataURL => {
        console.log("DATA URL IS: ", dataURL);
      })
    })

    // video.src = video.srcObject = null;
    // video.src = URL.createObjectURL(recorder.getBlob());
    // video.play();
    // recorder.camera.stop();
    // recorder.destroy();
    // recorder = null;
  }

  initRecording(e) {
    const { video, recorder } = this.props;
    document.getElementById('btn-start-recording').disabled = true;
    // e.target.disabled = true;
    this.captureCamera();


    // this.captureCamera((camera) => {
    //   setSrcObject(camera, video);
    //   video.play();

    //   recorder = RecordRTC(camera, {
    //     type: 'video'
    //   });

    //   recorder.startRecording();

    //   //release camera on stopRecording
    //   recorder.camera = camera;
    //   document.getElementById('btn-stop-recording').disabled = false;
    // })
  };


  endRecording() {
    document.getElementById('btn-stop-recording').disabled = true;
    this.stopRecordingCallback();
  }


  render() {
    return (
      <div>
        <video controls autoPlay id="video"></video>
        <br/>
        <div>
          <button id="btn-start-recording" onClick={(e) => {e.preventDefault(); this.initRecording(e)}}>Start Recording</button>
          <button id="btn-stop-recording" onClick={(e) => {e.preventDefault(); this.endRecording()}}>Stop Recording</button>
        </div>
      </div>
    );
  }
};


const mapStateToProps = (state) => {
  const { videoData } = state;
  const { recorder, video } = videoData;
  return {
    recorder,
    video,
  };
};


export default connect(mapStateToProps)(VideoRecorder);
