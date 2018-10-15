var peer = new Peer('a', {key: 'peerjs', port:9000, host:'localhost', debug:3});

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});

navigator.mediaDevices.getUserMedia({video:true, audio:false})
.then(function(mediaStream) {
	// Call a peer, providing our mediaStream
	let call = peer.call('b',
		mediaStream);
	call.on('stream', function(stream) {
			v.srcObject = stream
		// `stream` is the MediaStream of the remote peer.
		// Here you'd add it to an HTML video/canvas element.
	});
})
