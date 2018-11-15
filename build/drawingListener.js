class DrawingListener{
	constructor(c){
		this.mouseDown = false
		this.c = c
		this.currentStrokeColor = '#885ead'
		this.scaleFactor
		this.lastMousePos
		this.portraitHistory = {
			'canvasWidth': null,
			'canvasHeight': null,
			'mousePositionArray': []
		}

		this.mouseDownListener = this.mouseDownListener.bind(this)
		this.mouseUpListener = this.mouseUpListener.bind(this)
		this.mouseMoveListener = this.mouseMoveListener.bind(this)
		let colorPicker = document.getElementById('colorPickerInput')

		colorPicker.value = this.currentStrokeColor
	}

	getAndStoreMousePos(evt, mouseUpBool) {
		let rect = this.c.getBoundingClientRect()
		let scaleFactor = window.innerHeight / videoHeight
		this.portraitHistory.mousePositionArray.push({
			x: (evt.clientX - rect.left)/this.scaleFactor
			, y: (evt.clientY-rect.top)/this.scaleFactor
			, mouseUp: mouseUpBool
			, color: this.currentStrokeColor 
		})
		console.log('get and store')
		return {
			x: (evt.clientX - rect.left) / this.scaleFactor
			, y: (evt.clientY - rect.top) / this.scaleFactor
		}
	}

	mouseDownListener(evt){
		this.mouseDown = true
		this.lastMousePos = this.getAndStoreMousePos(evt, false)
		console.log('mouse down')

	}

	mouseUpListener(evt){
		this.mouseDown = false  
		this.getAndStoreMousePos(evt, true)
	}

	mouseMoveListener(evt){
		if (this.mouseDown) {
			const mousePos = this.getAndStoreMousePos(evt, false)
			const ctx = this.c.getContext('2d')
			ctx.beginPath()
			ctx.moveTo(this.lastMousePos.x, this.lastMousePos.y)
			ctx.lineTo(mousePos.x, mousePos.y)
			ctx.lineWidth = 1

			ctx.strokeStyle = this.currentStrokeColor
			ctx.stroke()

			this.lastMousePos = mousePos
		}
	}

	setStrokeColor(jscolor){
		this.currentStrokeColor = '#' + jscolor
	}

	setScaleFactor(factor){
		this.scaleFactor = factor
	}

}