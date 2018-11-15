let godVideo = document.getElementById('godVideo') 
const videos = []
const row = document.getElementById('previousPortraitsTable')

let productionServer = window.location.hostname.indexOf('localhost') === -1

let sessionIds = []

const pollForPortraits = () => {
	axios.get('/previousportraits').then((response)=>{
		for(pastPortrait of response.data) {
			if (!sessionIds.includes(pastPortrait.sessionId)) {		
				let backgroundPortait = document.createElement('canvas')
				col = document.createElement('div')
				col.className = 'col-2'
				backgroundPortait.width = pastPortrait.canvasWidth
				backgroundPortait.height = pastPortrait.canvasWidth*.75 //standardize aspect ratio
				backgroundPortait.className = 'previousPortraitsArrayCanvas'
				sessionIds.push(pastPortrait.sessionId)
				col.appendChild(backgroundPortait)
				row.prepend(col)
				playDrawing (backgroundPortait, pastPortrait.mousePositionArray, 1, 25, true,  500)
				videos.push(backgroundPortait)
			}
		}
	})
}

pollForPortraits()
setInterval(pollForPortraits,10000)
