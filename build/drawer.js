// variables "c" and "ctx" refer to the canvas and canvas 2D context respectively, and are defined in draw.js

const videoOfSitter = document.getElementById("videoOfSitter")

let urlParams = new URLSearchParams(window.location.search);
let sitterId = urlParams.get('sitterId');
let drawerId = urlParams.get('drawerId');

let videoWidth;
let videoHeight;

// const peer = new Peer(drawerId, {key:'peerjs', port:443, host:'sleepy-earth-42956.herokuapp.com', path: '/api', debug:3});
const peer = new Peer(drawerId, {key:'peerjs', port:9000, host:'localhost', path: '/api', debug:3});

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});

navigator.mediaDevices.getUserMedia({video:true, audio:false})
.then(function(mediaStream) {
	// Call a peer, providing our mediaStream
	const webcamCall = peer.call(sitterId, mediaStream, {'metadata':'webcam'});
	webcamCall.on('stream', function(stream) {
		videoOfSitter.srcObject = stream
		// FIXME
		setTimeout(()=>{
			videoWidth = videoOfSitter.videoWidth
			videoHeight = videoOfSitter.videoHeight
			c.width = videoWidth
			c.height = videoHeight
			ctx.fillStyle="white"
			ctx.fillRect(0, 0, c.width, c.height);
		}, 200)
	});

	const canvasStream = c.captureStream(25);
	const canvasCall = peer.call(sitterId, canvasStream, {'metadata':'canvas'});
})
