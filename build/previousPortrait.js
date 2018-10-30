let urlParams = new URLSearchParams(window.location.search)
let portraitId = urlParams.get('portraitId')

axios.get('/previousportrait', portraitId).then((response)=>{
	console.log(response)
})