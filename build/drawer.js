let c = document.getElementById('drawerCanvas')
let ctx = c.getContext('2d')
const videoOfSitter = document.getElementById('videoOfSitter')
const saveButton = document.getElementById('saveButton')

let urlParams = new URLSearchParams(window.location.search)
let sitterId = urlParams.get('sitterId')
let drawerId = urlParams.get('drawerId')

let productionServer = window.location.hostname.indexOf('localhost') === -1

let videoWidth
let videoHeight

let peer
let conn

drawingListener = new DrawingListener(c)

if (productionServer) {
	peer = new Peer(drawerId, {key:'peerjs', port:443, host:'sleepy-earth-42956.herokuapp.com', path: '/api', debug:1})
} else {
	peer = new Peer(drawerId, {key:'peerjs', port:9000, host:'localhost', path: '/api', debug:1})

}

navigator.mediaDevices.getUserMedia({video:true, audio:false})
.then(function(mediaStream) {
	// Call a peer, providing our mediaStream
	const webcamCall = peer.call(sitterId, mediaStream, {'metadata':{'type': 'webcam'}})
	webcamCall.on('stream', function(stream) {
		videoOfSitter.srcObject = stream
	})

	sessionId = String((new Date()).getTime()) + sitterId + drawerId
	drawingListener.portraitHistory.sessionId = sessionId
	const canvasStream = c.captureStream(25)
	const canvasCall = peer.call(sitterId, canvasStream, {'metadata':{'type': 'canvas', 'id': sessionId}})

	peer.on('call', function(call) {
		// Answer the call, providing our mediaStream
		call.answer(canvasStream);
	})
	conn = peer.connect(sitterId)
}).catch(function(err){
	if (err === 'DOMException: Requested device not found') {
		alert('You need a webcam to use this app, sorry!')
	} else {
		alert('Sorry! Something went wrong :(')
	}
})

videoOfSitter.onplaying = () => {
	videoWidth = videoOfSitter.videoWidth
	videoHeight = videoOfSitter.videoHeight
	c.width = videoWidth
	c.height = videoHeight
	drawingListener.scaleFactor = window.innerHeight / videoHeight
	ctx.fillStyle='white'
	ctx.fillRect(0, 0, c.width, c.height)
	drawingListener.portraitHistory.canvasWidth = videoWidth
	drawingListener.portraitHistory.canvasHeight = videoHeight
}


document.body.onresize = () => {
	drawingListener.setScaleFactor(window.innerHeight / videoHeight)
}

const update = (jscolor) => {
	// 'jscolor' instance can be used as a string
	drawingListener.setStrokeColor(jscolor)
}

c.addEventListener('mousedown', drawingListener.mouseDownListener)
c.addEventListener('mouseup', (evt) => {
	drawingListener.mouseUpListener(evt)
	conn.send(drawingListener.portraitHistory)
})
c.addEventListener('mousemove', drawingListener.mouseMoveListener)

const savePortrait = () => {
	if(drawingListener.portraitHistory.mousePositionArray.length > 20){
		axios.post('/saveportrait', drawingListener.portraitHistory).then((response)=>{
			window.open('/previousPortrait.html?id='+response.data)
		})
	}else{
		alert('Please draw some more!')
	}
}
