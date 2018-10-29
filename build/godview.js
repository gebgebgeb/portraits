let godVideo = document.getElementById('godVideo') 
let urlParams = new URLSearchParams(window.location.search);
let drawerIds = JSON.parse(urlParams.get('allDrawerIds'))
let godViewId = urlParams.get('godViewId')
const drawerCalls = []
const videos = []
const row = document.getElementById('videoTable')

let productionServer = window.location.hostname.indexOf("localhost") === -1

let peer

if (productionServer) {
	peer = new Peer(godViewId, {key:'peerjs', port:443, host:'sleepy-earth-42956.herokuapp.com', path: '/api', debug:3})
} else {
	peer = new Peer(godViewId, {key:'peerjs', port:9000, host:'localhost', path: '/api', debug:3})

}

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
  console.log('drawer ids: '+drawerIds)
});


navigator.mediaDevices.getUserMedia({video:true, audio:false})
.then(function(mediaStream) {
	for (drawerId of drawerIds) {
		console.log(drawerId)
		drawerCalls.push(peer.call(drawerId,mediaStream))
		console.log(drawerCalls)
		drawerCalls[drawerCalls.length-1].on('stream', function(stream) {
			videos.push(document.createElement("video"))
			col = document.createElement('div')
			col.className = 'col-4'
			videos[videos.length-1].srcObject = stream
			videos[videos.length-1].autoplay = true
			videos[videos.length-1].setAttribute('playsinline', '')
			videos[videos.length-1].className = 'godViewVideo'
			col.appendChild(videos[videos.length-1])
			row.appendChild(col)
		})
	}
})
