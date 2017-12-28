import React, { Component } from 'react';
import { connect } from 'react-redux';
const Peer = require('simple-peer');


class VideoChatBox extends Component {
  constructor(props) {
    super(props);
    this.signalPeer = this.signalPeer.bind(this);
    this.initConnection = this.initConnection.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.receivedData = this.receivedData.bind(this);
    this.playStream = this.playStream.bind(this);
  }

  componentDidMount() {
    navigator.getUserMedia =  (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    navigator.getUserMedia({ video: true, audio: true }, (stream) => {
      const peer = new Peer({
        initiator: location.hash === "#init",
        trickle: false,
        stream: stream
      });

      console.log("Peer is: ", peer);
      peer.on("call", (call) => {
        console.log("CALL IS: ", call);
        peer.answer(stream);
      })

      peer.on('stream', (stream) => {
        this.playStream(stream);
      });

      peer.on('signal', (data) => {
        this.signalPeer(data);
      });

      document.getElementById('connect').addEventListener('click', () => {
        this.initConnection();
      });

      document.getElementById('send').addEventListener('click', () => {
        this.sendMessage(peer);
      });

      peer.on('data', (data) => {
        this.receivedData(data);
      });


    }, (err) => {
      console.error(err);
    });
  }

  signalPeer(data) {
    console.log("SIGNAL SENT: ", data);
    document.getElementById('yourId').value = JSON.stringify(data);
  }

  initConnection() {
    console.log("AYOOO");
    const otherId = JSON.parse(document.getElementById('otherId').value);
    this.signalPeer(otherId);
  }

  sendMessage(peer) {
    const yourMessage = document.getElementById('yourMessage').value;
    peer.send(yourMessage);
  }

  receivedData(data) {
    console.log("GOT THE DATA: ", data);
    document.getElementById('messages').textContent += data + "\n";
  }

  playStream(stream) {
    console.log("GOT THE STREAM: ", stream);
    const video = document.createElement('video');
    document.getElementById("messages").appendChild(video);

    video.src = window.URL.createObjectURL(stream);
    video.play();
  }


  render() {
    return (
      <div>
        <label>YourID: </label>
        <br/>
        <textarea id="yourId"></textarea>
        <br/>
        <label>Other ID:</label>
        <textarea id="otherId"></textarea>
        <button id="connect">Connect</button>


        <label>Enter Message:</label>
        <textarea id="yourMessage"></textarea>
        <button id="send">Send</button>
        <pre id="messages"></pre>

      </div>
    )
  }
}


export default VideoChatBox;
