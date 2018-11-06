let godVideo = document.getElementById('godVideo') 
const drawerCalls = []
const videos = []
const row = document.getElementById('videoTable')

let productionServer = window.location.hostname.indexOf("localhost") === -1

let peer

const draw = (canvas, mousePositionArray, mousePosIdx) => {
	let ctx = canvas.getContext('2d')
	let lastMousePos = mousePositionArray[mousePosIdx-1]
	let mousePos = mousePositionArray[mousePosIdx]
	console.log(mousePos.mouseUp)
	if(!lastMousePos.mouseUp){
		ctx.beginPath()
		ctx.moveTo(lastMousePos.x, lastMousePos.y)
		ctx.lineTo(mousePos.x, mousePos.y)
		ctx.lineWidth = 1
		ctx.strokeStyle = '#009900'
		ctx.stroke()
	}
	if(mousePosIdx < mousePositionArray.length - 1){
		setTimeout(()=>draw(canvas, mousePositionArray, mousePosIdx + 1), 150)
	}else{
		setTimeout(()=>{
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			draw(canvas, mousePositionArray, 1)
		}, 500)
	}
}

axios.get('/previousportraits').then((response)=>{
	console.log(response)
	for(pastPortrait of response.data){
		videos.push(document.createElement("canvas"))
		col = document.createElement('div')
		col.className = 'col-4'
		videos[videos.length-1].width = pastPortrait.canvasWidth
		videos[videos.length-1].height = pastPortrait.canvasHeight
		videos[videos.length-1].className = 'godViewCanvas'
		col.appendChild(videos[videos.length-1])
		row.appendChild(col)
		draw(videos[videos.length-1], pastPortrait.mousePositionArray, 1)
	}
})

// 	let godViewId = response.data.godViewId
// 	let drawerIds = response.data.allDrawerIds

// 	if (productionServer) {
// 		peer = new Peer(godViewId, {key:'peerjs', port:443, host:'sleepy-earth-42956.herokuapp.com', path: '/api', debug:3})
// 	} else {
// 		peer = new Peer(godViewId, {key:'peerjs', port:9000, host:'localhost', path: '/api', debug:3})
// 	}

// 	peer.on('open', function(id) {
// 		console.log('My peer ID is: ' + id);
// 		console.log('drawer ids: '+drawerIds)
// 	});

// 	navigator.mediaDevices.getUserMedia({video:true, audio:false})
// 	.then(function(mediaStream) {
// 		for (drawerId of drawerIds) {
// 			console.log(drawerId)
// 			drawerCalls.push(peer.call(drawerId,mediaStream))
// 			console.log(drawerCalls)
// 			drawerCalls[drawerCalls.length-1].on('stream', function(stream) {
// 				videos.push(document.createElement("video"))
// 				col = document.createElement('div')
// 				col.className = 'col-4'
// 				videos[videos.length-1].srcObject = stream
// 				videos[videos.length-1].autoplay = true
// 				videos[videos.length-1].setAttribute('playsinline', '')
// 				videos[videos.length-1].className = 'godViewVideo'
// 				col.appendChild(videos[videos.length-1])
// 				row.appendChild(col)
// 			})
// 		}
// 	})
// })


