// document.addEventListener("deviceready", onDeviceReady, false);
// function onDeviceReady() {
//     console.log("console.log works well");
// }

let logoCanvas = document.getElementById('logo')
playDrawing(logoCanvas, logoArray, 1, 10)

alert(window.location.hostname)

const nextAvailablePage = () => {
	alert('ajax request attempted')
	axios.get(getEnvironment()+'/nextAvailablePage').then((response)=>{
		alert(response.data.drawerId)
		if (response.data.drawerId) {
			let drawerURL = '/drawer.html?sitterId='+response.data.sitterId+'&drawerId='+response.data.drawerId
			alert(drawerURL)
			window.open(drawerURL)
		} else {
			let sitterURL = '/sitter.html?sitterId='+response.data.sitterId
			alert(sitterURL)
			window.open(sitterURL)
		}
	})
}
