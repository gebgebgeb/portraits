let urlParams = new URLSearchParams(window.location.search)
let portraitId = urlParams.get('id')

let previousCanvas = document.getElementById('previousCanvas')
const ctx = previousCanvas.getContext('2d')

const draw = (mousePositionArray, mousePosIdx) => {
	let lastMousePos = mousePositionArray[mousePosIdx-1]
	let mousePos = mousePositionArray[mousePosIdx]
	if(!lastMousePos.mouseUp){
		ctx.beginPath()
		ctx.moveTo(lastMousePos.x, lastMousePos.y)
		ctx.lineTo(mousePos.x, mousePos.y)
		ctx.lineWidth = 1
		ctx.strokeStyle = mousePositionArray[mousePosIdx-1].color
		ctx.stroke()
	}
	if(mousePosIdx < mousePositionArray.length - 1){
		setTimeout(()=>draw(mousePositionArray, mousePosIdx + 1), 40)
	}
}

axios.get('/previousportrait', {params:{_id: portraitId}}).then((response)=>{
	previousCanvas.width = response.data.canvasWidth
	previousCanvas.height = response.data.canvasHeight
	draw(response.data.mousePositionArray, 1)
})



