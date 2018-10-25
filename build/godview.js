let godVideo = document.getElementById('godVideo') 
let urlParams = new URLSearchParams(window.location.search);
let drawerIds = JSON.parse(urlParams.get('allDrawerIds'))
let godViewId = urlParams.get('godViewId')
const drawerCalls = []
const videos = []

// const peer = new Peer(godViewId, {key: 'peerjs', port:9000, host:'localhost', path: '/api', debug:2});

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
  console.log('drawer ids: '+drawerIds)
});


for (drawerId of drawerIds) {
	navigator.mediaDevices.getUserMedia({video:true, audio:false})
	.then(function(mediaStream) {
		let peer = new Peer(godViewId+drawerId, {key: 'peerjs', port:9000, host:'localhost', path: '/api', debug:2});
		drawerCalls.push(peer.call(drawerId,mediaStream))
		console.log(drawerCalls)
		drawerCalls[drawerCalls.length-1].on('stream', function(stream) {
			videos.push(document.createElement("video"))
			videos[videos.length-1].srcObject = stream
			videos[videos.length-1].autoplay = true
			document.body.appendChild(videos[videos.length-1])
		})
	})
}

// peer.on('call', function(call) {
// 	// Answer the call, providing our mediaStream
// 	call.answer();
// 	console.log("connected")
// 	call.on('stream', function(stream) {
// 		// if(call.metadata == 'webcam'){
// 		// 	videoOfDrawer.srcObject = stream
// 		// }
// 		// if(call.metadata == 'canvas'){
// 		// 	videoOfDrawerCanvas.srcObject = stream
// 		console.log("got stream")
// 		// }
// 		godVideo.srcObject = stream
// 	});
// });

// })

