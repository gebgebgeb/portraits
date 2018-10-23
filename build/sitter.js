const videoOfDrawer = document.getElementById('videoOfDrawer')
const videoOfDrawerCanvas = document.getElementById('videoOfDrawerCanvas')

let urlParams = new URLSearchParams(window.location.search);
let sitterId = urlParams.get('sitterId');

// const peer = new Peer(sitterId, {key: 'peerjs', port:443, host:'sleepy-earth-42956.herokuapp.com', path: '/api', debug:3});
const peer = new Peer(sitterId, {key: 'peerjs', port:9000, host:'localhost', path: '/api', debug:3});

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
});

