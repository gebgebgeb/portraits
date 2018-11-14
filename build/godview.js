let godVideo = document.getElementById('godVideo') 
const videos = []
const row = document.getElementById('videoTable')

let productionServer = window.location.hostname.indexOf("localhost") === -1

let sessionIds = []

const pollForPortraits = () => {
	axios.get('/previousportraits').then((response)=>{
		for(pastPortrait of response.data) {
			if (sessionIds.includes(pastPortrait.sessionId)) {
				continue
			} else {		
				videos.push(document.createElement("canvas"))
				col = document.createElement('div')
				col.className = 'col-2'
				videos[videos.length-1].width = pastPortrait.canvasWidth
				videos[videos.length-1].height = pastPortrait.canvasWidth*.75 //standardize aspect ratio
				videos[videos.length-1].className = 'godViewCanvas'
				sessionIds.push(pastPortrait.sessionId)
				col.appendChild(videos[videos.length-1])
				row.prepend(col)
				playDrawing (videos[videos.length-1], pastPortrait.mousePositionArray, 1, 25, true,  500)
			}
		}
	})
}

pollForPortraits()
setInterval(pollForPortraits,10000)