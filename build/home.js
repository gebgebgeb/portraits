let logoCanvas = document.getElementById('logo')
playDrawing(logoCanvas, logoArray, 1, 10)

const nextAvailablePage = () => {
	axios.get(getEnvironment()+'/nextAvailablePage').then((response)=>{
		if (response.data.drawerId) {
			window.open('/drawer.html?sitterId='+response.data.sitterId+'&drawerId='+response.data.drawerId)
		} else {
			window.open('/sitter.html?sitterId='+response.data.sitterId)
		}
	})
}
