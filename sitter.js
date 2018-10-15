var peer = new Peer('b', {key: 'lwjd5qra8257b9'});

peer.on('call', function(call) {
	// Answer the call, providing our mediaStream
	call.answer();
	console.log("received")
});
