const playDrawing = (canvas, mousePositionArray, mousePosIdx, speed, loopBool, loopDelay) => {
	loopDelay = loopDelay || 500
	loopBool = loopBool || false

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
		setTimeout(()=>playDrawing(canvas, mousePositionArray, mousePosIdx + 1, speed, loopBool, loopDelay), speed)
	}else{
		if (loopBool) {
			setTimeout(()=>{
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				playDrawing(canvas, mousePositionArray, 1, speed, loopBool, loopDelay)
			}, loopDelay)
		}
	}
}
