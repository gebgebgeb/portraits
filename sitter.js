const vid = document.getElementById('v')
const canvasView = document.getElementById('canvasView')

const peer = new Peer('b', {key: 'peerjs', port:9000, host:'localhost', debug:3});

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

