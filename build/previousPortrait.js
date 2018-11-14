let urlParams = new URLSearchParams(window.location.search)
let portraitId = urlParams.get('id')

let previousCanvas = document.getElementById('previousCanvas')

axios.get('/previousportrait', {params:{_id: portraitId}}).then((response)=>{
	previousCanvas.width = response.data.canvasWidth
	previousCanvas.height = response.data.canvasHeight
	playDrawing(previousCanvas, response.data.mousePositionArray, 1, 25, false, 1)
})