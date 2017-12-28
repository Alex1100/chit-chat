navigator.mediaDevices.getUserMedia({ video: true, audio: true }, (stream) => {
  var Peer = require('simple-peer');
  var peer = new Peer({
    initiator: location.hash === "#init",
    trickle: false,
    stream: stream
  });


  peer.on('signal', (data) => {
    document.getElementById('yourId').value = JSON.stringify(data);
  });


  document.getElementById('connect').addEventListener('click', () => {
    const otherId = JSON.parse(document.getElementById('otherId').value);
    peer.signal(otherId);
  });


  document.getElementById('send').addEventListener('click', () => {
    const yourMessage = document.getElementById('yourMessage').value;
    peer.send(yourMessage);
  });

  peer.on('data', (data) => {
    document.getElementById('messages').textContent += data + "\n";
  });


  peer.on('stream', (stream) => {
    const video = document.createElement('video');
    document.body.appendChild(video);

    video.src = window.URL.createObjectURL(stream);
    video.play();
  });
}, (err) => {
  console.error(err);
});



export const emailRegX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

