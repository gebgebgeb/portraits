const vid = document.getElementById('v')

var peer = new Peer('b', {key: 'peerjs', port:9000, host:'localhost', debug:3});

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});

peer.on('call', function(call) {
	// Answer the call, providing our mediaStream
	call.answer();
	console.log("received")
	
	call.on('stream', function(stream) {
  	// `stream` is the MediaStream of the remote peer.
  		v.srcObject = stream
  		console.log(stream.getVideoTracks())
  	// Here you'd add it to an HTML video/canvas element.
	});
});

