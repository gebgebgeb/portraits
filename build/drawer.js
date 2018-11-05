let c = document.getElementById('drawerCanvas')
let ctx = c.getContext('2d')
const videoOfSitter = document.getElementById("videoOfSitter")
const saveButton = document.getElementById('saveButton')

let urlParams = new URLSearchParams(window.location.search)
let sitterId = urlParams.get('sitterId')
let drawerId = urlParams.get('drawerId')

const portraitHistory = {
	'canvasWidth': null,
	'canvasHeight': null,
	'mousePositionArray': []
}


let productionServer = window.location.hostname.indexOf("localhost") === -1

let scaleFactor
let videoWidth
let videoHeight

let peer
let conn

if (productionServer) {
	peer = new Peer(drawerId, {key:'peerjs', port:443, host:'sleepy-earth-42956.herokuapp.com', path: '/api', debug:3})
} else {
	peer = new Peer(drawerId, {key:'peerjs', port:9000, host:'localhost', path: '/api', debug:3})

}

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id)
})

// peer2.on('open', function(id) {
//   console.log('My peer ID is: ' + id)
// })

navigator.mediaDevices.getUserMedia({video:true, audio:false})
.then(function(mediaStream) {
	// Call a peer, providing our mediaStream
	const webcamCall = peer.call(sitterId, mediaStream, {'metadata':'webcam'})
	webcamCall.on('stream', function(stream) {
		videoOfSitter.srcObject = stream
	})

	const canvasStream = c.captureStream(25)
	const canvasCall = peer.call(sitterId, canvasStream, {'metadata':'canvas'})

	peer.on('call', function(call) {
		// Answer the call, providing our mediaStream
		call.answer(canvasStream);
	})
	conn = peer.connect(sitterId)

})

videoOfSitter.onplaying = () => {
	videoWidth = videoOfSitter.videoWidth
	videoHeight = videoOfSitter.videoHeight
	c.width = videoWidth
	c.height = videoHeight
	scaleFactor = window.innerHeight / videoHeight
	ctx.fillStyle="white"
	ctx.fillRect(0, 0, c.width, c.height)
	portraitHistory.canvasWidth = videoWidth
	portraitHistory.canvasHeight = videoHeight
}

document.body.onresize = () => {
	scaleFactor = window.innerHeight / videoHeight
}

//Drawing functions
let mouseDown = false
let lastMousePos

c.addEventListener('mousedown', mouseDownListener)
c.addEventListener('mouseup', mouseUpListener)
c.addEventListener('mousemove', drawStroke)

function getMousePos(evt) {
	let rect = c.getBoundingClientRect()
	let scaleFactor = window.innerHeight / videoHeight
	portraitHistory.mousePositionArray.push({
		x: (evt.clientX - rect.left)/scaleFactor
		, y: (evt.clientY-rect.top)/scaleFactor
		, mouseUp: false
	})
	return {
		x: (evt.clientX - rect.left) / scaleFactor
		, y: (evt.clientY - rect.top) / scaleFactor
	}
}

function mouseDownListener(evt){
	let c = document.getElementById('canvas')
	mouseDown = true
	lastMousePos = getMousePos(evt)
}

function mouseUpListener(evt){
	mouseDown = false  
	let rect = c.getBoundingClientRect()
	let scaleFactor = window.innerHeight / videoHeight
	portraitHistory.mousePositionArray.push({
		x: (evt.clientX - rect.left)/scaleFactor
		, y: (evt.clientY-rect.top)/scaleFactor
		, mouseUp: true 
	})
	conn.send(portraitHistory)
	console.log("should have sent")
}

function drawStroke(evt){
	if (mouseDown) {
		const mousePos = getMousePos(evt)
		ctx.beginPath()
		ctx.moveTo(lastMousePos.x, lastMousePos.y)
		ctx.lineTo(mousePos.x, mousePos.y)
		ctx.lineWidth = 1
		ctx.strokeStyle = '#009900'
		ctx.stroke()

		lastMousePos = mousePos
	}
}

const savePortrait = () => {
	axios.post('/saveportrait', portraitHistory).then((response)=>{
		window.open('/previousPortrait.html?id='+response.data)
	})
}

