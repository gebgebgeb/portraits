const videoOfDrawer = document.getElementById('videoOfDrawer')
const videoOfDrawerCanvas = document.getElementById('videoOfDrawerCanvas')

let urlParams = new URLSearchParams(window.location.search);
let sitterId = urlParams.get('sitterId');

let productionServer = window.location.hostname.indexOf("localhost") === -1

let peer
let portraitHistory

if (productionServer) {
	peer = new Peer(sitterId, {key:'peerjs', port:443, host:'sleepy-earth-42956.herokuapp.com', path: '/api', debug:3})
} else {
	peer = new Peer(sitterId, {key:'peerjs', port:9000, host:'localhost', path: '/api', debug:3})

}

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});

navigator.mediaDevices.getUserMedia({video:true, audio:false})
.then(function(mediaStream) {
	peer.on('call', function(call) {
		// Answer the call, providing our mediaStream
		call.answer(mediaStream);
		
		call.on('stream', function(stream) {
			if(call.metadata == 'webcam'){
				videoOfDrawer.srcObject = stream
			}
			if(call.metadata == 'canvas'){
				videoOfDrawerCanvas.srcObject = stream
			}
		});
	});
	peer.on('connection', (conn) => {
		console.log("first level")
		conn.on('data', (portraitHist) => {
			portraitHistory = portraitHist
			console.log("portraitHistoryArray:"+portraitHistory)
		})
	})
}).catch(function(err){
	alert('You need a webcam to use this app, sorry!')
});

const savePortrait = () => {
	axios.post('/saveportrait', portraitHistory).then((response)=>{
		window.open('/previousPortrait.html?id='+response.data)
	})
}
