let c = document.getElementById('drawerCanvas');
let ctx = c.getContext('2d');

let mouseDown = false
let lastMousePos

c.addEventListener('mousedown', mouseDownListener)
c.addEventListener('mouseup', mouseUpListener)
c.addEventListener('mousemove', drawStroke)

function getMousePos(evt) {
	let rect = c.getBoundingClientRect();
	let scaleFactor = window.innerHeight / videoHeight
	return {
		x: (evt.clientX - rect.left) / scaleFactor
		, y: (evt.clientY - rect.top) / scaleFactor
	};
}

function mouseDownListener(evt){
	let c = document.getElementById('canvas')
	mouseDown = true;
	lastMousePos = getMousePos(evt);
}

function mouseUpListener(evt){
	mouseDown = false;  
}

function drawStroke(evt){
	if (mouseDown) {
		const mousePos = getMousePos(evt);
		ctx.beginPath();
		ctx.moveTo(lastMousePos.x, lastMousePos.y);
		ctx.lineTo(mousePos.x, mousePos.y);
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#009900';
		ctx.stroke();

		lastMousePos = mousePos;
	}
}
