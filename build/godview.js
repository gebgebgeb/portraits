let godVideo = document.getElementById('godVideo') 
const videos = []
const row = document.getElementById('videoTable')

let productionServer = window.location.hostname.indexOf("localhost") === -1

let sessionIds = []

const draw = (canvas, mousePositionArray, mousePosIdx) => {
	let ctx = canvas.getContext('2d')
	let lastMousePos = mousePositionArray[mousePosIdx-1]
	let mousePos = mousePositionArray[mousePosIdx]
	if(!lastMousePos.mouseUp){
		ctx.beginPath()
		ctx.moveTo(lastMousePos.x, lastMousePos.y)
		ctx.lineTo(mousePos.x, mousePos.y)
		ctx.lineWidth = 2
		ctx.strokeStyle = mousePositionArray[mousePosIdx-1].color
		ctx.stroke()
	}
	if(mousePosIdx < mousePositionArray.length - 1){
		setTimeout(()=>draw(canvas, mousePositionArray, mousePosIdx + 1), 25)
	}else{
		setTimeout(()=>{
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			draw(canvas, mousePositionArray, 1)
		}, 500)
	}
}

axios.get('/previousportraits').then((response)=>{
	console.log(response)
	for(pastPortrait of response.data){
		videos.push(document.createElement("canvas"))
		col = document.createElement('div')
		col.className = 'col-2'
		videos[videos.length-1].width = pastPortrait.canvasWidth
		videos[videos.length-1].height = pastPortrait.canvasWidth*.75
		videos[videos.length-1].className = 'godViewCanvas'
		sessionIds.push(pastPortrait.sessionId)
		col.appendChild(videos[videos.length-1])
		row.appendChild(col)
		draw(videos[videos.length-1], pastPortrait.mousePositionArray, 1)
	}
})

setInterval(()=>{
	console.log('hello')
	axios.get('/previousportraits').then((response)=>{
		for(pastPortrait of response.data) {
			if (sessionIds.includes(pastPortrait.sessionId)) {
				continue
			} else {
				videos.push(document.createElement("canvas"))
				col = document.createElement('div')
				col.className = 'col-2'
				videos[videos.length-1].width = pastPortrait.canvasWidth
				videos[videos.length-1].height = pastPortrait.canvasHeight
				videos[videos.length-1].className = 'godViewCanvas'
				sessionIds.push(pastPortrait.sessionId)
				col.appendChild(videos[videos.length-1])
				row.prepend(col)
				draw(videos[videos.length-1], pastPortrait.mousePositionArray, 1)
			}
		}
	})

}, 10000)