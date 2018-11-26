function onDeviceReady() {
    if (window.cordova.logger) {
        window.cordova.logger.__onDeviceReady();
    }
}

document.addEventListener('deviceready', onDeviceReady, false);

let logoCanvas = document.getElementById('logo')
playDrawing(logoCanvas, logoArray, 1, 10)

console.log('home.js loaded')

const nextAvailablePage = () => {
	console.log('sending ajax request')
	axios.get(getEnvironment()+'/nextAvailablePage').then((response)=>{
		if (response.data.drawerId) {
			window.open('/drawer.html?sitterId='+response.data.sitterId+'&drawerId='+response.data.drawerId)
		} else {
			window.open('/sitter.html?sitterId='+response.data.sitterId)
		}
	})
}
