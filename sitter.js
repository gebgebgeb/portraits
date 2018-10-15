const vid = document.getElementById('v')

var peer = new Peer('b', {key: 'peerjs', port:9000, host:'localhost', debug:3});

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});



navigator.mediaDevices.getUserMedia({video:true, audio:false})
.then(function(mediaStream) {
	peer.on('call', function(call) {
		// Answer the call, providing our mediaStream
		call.answer(mediaStream);
		
		call.on('stream', function(stream) {
				v.srcObject = stream
			// `stream` is the MediaStream of the remote peer.
			// Here you'd add it to an HTML video/canvas element.
		});
	});
});
