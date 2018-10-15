var peer = new Peer({key: 'lwjd5qra8257b9'});
navigator.mediaDevices.getUserMedia({video:true, audio:false})
.then(function(mediaStream) {
	// Call a peer, providing our mediaStream
	let call = peer.call('dest-peer-id',
		mediaStream);
})
