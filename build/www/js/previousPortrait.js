let urlParams = new URLSearchParams(window.location.search)
let portraitId = urlParams.get('id')
let link = document.getElementById('linkToPreviousPortrait')
let previousCanvas = document.getElementById('previousCanvas')

link.href = 'mailto:?subject=Check+Out+This+Portrait+I+Made&body=I+made+a+portrait,+you+can+see+it+here:+'+window.location

axios.get('/previousportrait', {params:{_id: portraitId}}).then((response)=>{
	previousCanvas.width = response.data.canvasWidth
	previousCanvas.height = response.data.canvasHeight
	playDrawing(previousCanvas, response.data.mousePositionArray, 1, 5)
})
