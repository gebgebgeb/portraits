var peer = new Peer('a', {key: 'peerjs', port:9000, host:'localhost', debug:3});

navigator.mediaDevices.getUserMedia({video:true, audio:false})
.then(function(mediaStream) {
	// Call a peer, providing our mediaStream
	let call = peer.call('b',
		mediaStream);
	console.log(peer.id)
})
