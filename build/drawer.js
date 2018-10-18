let urlParams = new URLSearchParams(window.location.search);
let sitterId = urlParams.get('sitterId')
let drawerId = urlParams.get('drawerId')
let port = urlParams.get('port')

console.log(drawerId)

const peer = new Peer(drawerId, {key:'peerjs', port:9000, host:'sleepy-earth-42956.herokuapp.com', path: '/api', debug:3});

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});

navigator.mediaDevices.getUserMedia({video:true, audio:false})
.then(function(mediaStream) {
	// Call a peer, providing our mediaStream
	const webcamCall = peer.call(sitterId, mediaStream, {'metadata':'webcam'});
	webcamCall.on('stream', function(stream) {
			v.srcObject = stream
	});


	const canvasStream = canvas.captureStream(25);
	console.log(canvasStream);
	const canvasCall = peer.call(sitterId, canvasStream, {'metadata':'canvas'});
	canvasCall.on('stream', function(stream){
	})
})


let mouseDown = false
let lastMousePos

let c = document.getElementById('canvas');
c.addEventListener('mousedown', mouseDownListener)
c.addEventListener('mouseup', mouseUpListener)
c.addEventListener('mousemove', mouseMoveListener)
let ctx = c.getContext('2d');
ctx.fillStyle="white"
ctx.fillRect(0, 0, c.width, c.height);

function getMousePos(canvas, evt) {
	let rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left
		, y: evt.clientY - rect.top
	};
}

function mouseDownListener(evt){
	let c = document.getElementById('canvas')
	mouseDown = true;
	lastMousePos = getMousePos(c, evt);
}

function mouseUpListener(evt){
	mouseDown = false;  
}
function mouseMoveListener(evt){
	if (mouseDown) {
		const mousePos = getMousePos(c, evt);
		ctx.beginPath();
		ctx.moveTo(lastMousePos.x, lastMousePos.y);
		ctx.lineTo(mousePos.x, mousePos.y);
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#009900';
		ctx.stroke();

		lastMousePos = mousePos;
	}
}

