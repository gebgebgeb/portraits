let c = document.getElementById('drawerCanvas')
let ctx = c.getContext('2d')
const videoOfSitter = document.getElementById("videoOfSitter")
const saveButton = document.getElementById('saveButton')
let currentStrokeColor = '#009900'

const portraitHistory = {
	'canvasWidth': null,
	'canvasHeight': null,
	'mousePositionArray': []
}

const sessionId = String((new Date()).getTime()) + 'self'
portraitHistory.sessionId = sessionId

let productionServer = window.location.hostname.indexOf("localhost") === -1

let scaleFactor
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
		, color: currentStrokeColor
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
		, color: currentStrokeColor 
	})
}

function drawStroke(evt){
	if (mouseDown) {
		const mousePos = getMousePos(evt)
		ctx.beginPath()
		ctx.moveTo(lastMousePos.x, lastMousePos.y)
		ctx.lineTo(mousePos.x, mousePos.y)
		ctx.lineWidth = 1
		ctx.strokeStyle = currentStrokeColor
		ctx.stroke()

		lastMousePos = mousePos
	}
}

const savePortrait = () => {
	console.log(portraitHistory)
	axios.post('/saveportrait', portraitHistory).then((response)=>{
		window.open('/previousPortrait.html?id='+response.data)
	})
}

const update = (jscolor) => {
    currentStrokeColor = '#' + jscolor
}

