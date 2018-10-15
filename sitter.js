var peer = new Peer(null, {key: 'lwjd5qra8257b9', secure: false, debug:3});

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});

peer.on('call', function(call) {
	// Answer the call, providing our mediaStream
	call.answer();
	console.log("received")
});
