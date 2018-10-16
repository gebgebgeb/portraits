const vid = document.getElementById('v')
const canvasView = document.getElementById('canvasView')

let urlParams = new URLSearchParams(window.location.search);
let sitterId = urlParams.get('sitterId');

console.log(sitterId)

const peer = new Peer(sitterId, {key: 'peerjs', port:9000, host:'localhost', debug:3});

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
				v.srcObject = stream
			}
			if(call.metadata == 'canvas'){
				canvasView.srcObject = stream
			}
		});
	});
});

