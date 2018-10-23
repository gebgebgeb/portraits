const videoOfSitter = document.getElementById("videoOfSitter")
let sitterLink = document.getElementById("sitterLink")

let videoWidth;
let videoHeight;

let c = document.getElementById('canvas');
let ctx = c.getContext('2d');

let urlParams = new URLSearchParams(window.location.search);
let sitterId = urlParams.get('sitterId');
let drawerId = urlParams.get('drawerId');

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


	const canvasStream = canvas.captureStream(25);
	console.log(canvasStream);
	const canvasCall = peer.call(sitterId, canvasStream, {'metadata':'canvas'});
	canvasCall.on('stream', function(stream){
	})
})


let mouseDown = false
let lastMousePos


c.addEventListener('mousedown', mouseDownListener)
c.addEventListener('mouseup', mouseUpListener)
c.addEventListener('mousemove', mouseMoveListener)

function getMousePos(evt) {
	let rect = c.getBoundingClientRect();
	let scaleFactor = window.innerHeight / videoHeight
	return {
		x: (evt.clientX - rect.left) / scaleFactor
		, y: (evt.clientY - rect.top) / scaleFactor
	};
}

function mouseDownListener(evt){
	let c = document.getElementById('canvas')
	mouseDown = true;
	lastMousePos = getMousePos(evt);
}

function mouseUpListener(evt){
	mouseDown = false;  
}
function mouseMoveListener(evt){
	if (mouseDown) {
		const mousePos = getMousePos(evt);
		ctx.beginPath();
		ctx.moveTo(lastMousePos.x, lastMousePos.y);
		ctx.lineTo(mousePos.x, mousePos.y);
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#009900';
		ctx.stroke();

		lastMousePos = mousePos;
	}
}