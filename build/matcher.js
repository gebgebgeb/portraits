let sitterLink = document.getElementById("sitterLink")
let drawerLink = document.getElementById("drawerLink")

axios.get('/friendpairs').then((response)=>{
	let sitterId = response.data.sitterId
	let drawerId = response.data.drawerId

	sitterLink.href = "sitter.html?sitterId="+sitterId
	drawerLink.href = "drawer.html?drawerId="+drawerId+"&sitterId="+sitterId
})

