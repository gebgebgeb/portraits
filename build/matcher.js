let sitterLink = document.getElementById("sitterLink")
let drawerLink = document.getElementById("drawerLink")
let logoCanvas = document.getElementById("logo")

axios.get('/friendpairs').then((response)=>{
	let sitterId = response.data.sitterId
	let drawerId = response.data.drawerId

	sitterLink.href = "sitter.html?sitterId="+sitterId
	drawerLink.href = "drawer.html?drawerId="+drawerId+"&sitterId="+sitterId
})

const drawLogo = (canvas, mousePositionArray, mousePosIdx) => {
	let ctx = canvas.getContext('2d')
	let lastMousePos = mousePositionArray[mousePosIdx-1]
	let mousePos = mousePositionArray[mousePosIdx]
	if(!lastMousePos.mouseUp){
		ctx.beginPath()
		ctx.moveTo(lastMousePos.x, lastMousePos.y - 50)
		ctx.lineTo(mousePos.x, mousePos.y - 50)
		ctx.lineWidth = 4
		ctx.strokeStyle = '#000000'
		ctx.stroke()
	}
	if(mousePosIdx < mousePositionArray.length - 1){
		setTimeout(()=>drawLogo(canvas, mousePositionArray, mousePosIdx + 1), 10)
	}else{
		setTimeout(()=>{
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawLogo(canvas, mousePositionArray, 1)
		}, 10000)
	}
}

drawLogo(logoCanvas, logoArray, 1)