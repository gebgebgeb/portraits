let c = document.getElementById('drawerCanvas')
let ctx = c.getContext('2d')
const videoOfSitter = document.getElementById("videoOfSitter")
const saveButton = document.getElementById('saveButton')
let currentStrokeColor = '#885ead'
const sessionId = String((new Date()).getTime()) + 'self'

drawingListener = new DrawingListener(c)

drawingListener.portraitHistory.sessionId = sessionId

let productionServer = window.location.hostname.indexOf("localhost") === -1

let videoWidth
let videoHeight


navigator.mediaDevices.getUserMedia({video:true, audio:false})
.then(function(mediaStream) {
	videoOfSitter.srcObject = mediaStream
})

videoOfSitter.onplaying = () => {
	videoWidth = videoOfSitter.videoWidth
	videoHeight = videoOfSitter.videoHeight
	c.width = videoWidth
	c.height = videoHeight
	drawingListener.setScaleFactor(window.innerHeight / videoHeight)
	ctx.fillStyle="white"
	ctx.fillRect(0, 0, c.width, c.height)
	drawingListener.portraitHistory.canvasWidth = videoWidth
	drawingListener.portraitHistory.canvasHeight = videoHeight
}

document.body.onresize = () => {
	drawingListener.setScaleFactor(window.innerHeight / videoHeight)
}

c.addEventListener('mousedown', drawingListener.mouseDownListener)
c.addEventListener('mouseup', drawingListener.mouseUpListener)
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

const update = (jscolor) => {
    drawingListener.setStrokeColor(jscolor)
}

