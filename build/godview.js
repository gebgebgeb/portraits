// var socket = io.connect('http://localhost:9000/serve');
// var stream = ss.createStream();

// ss(socket).emit('portrait', canvasStream)

// socket.on('connect',function(){      
// 	ss(socket).on('fromServerPortrait', function(stream, data) {
// 		console.log(stream)
// 		console.log(data)
// 		godVideo.srcObject = stream
// 	})
// })
let godVideo = document.getElementById('godVideo') 

const peer = new Peer(1001, {key: 'peerjs', port:9000, host:'localhost', path: '/api', debug:3});

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});

// navigator.mediaDevices.getUserMedia({video:true, audio:false})
// .then(function(mediaStream) {
// 	peer.on('call', function(call) {
// 		// Answer the call, providing our mediaStream
// 		call.answer(mediaStream);
		
// 		call.on('stream', function(stream) {
// 			// if(call.metadata == 'webcam'){
// 			// 	videoOfDrawer.srcObject = stream
// 			// }
// 			// if(call.metadata == 'canvas'){
// 			// 	videoOfDrawerCanvas.srcObject = stream
// 			// }
// 			godVideo.srcObject = stream
// 		});
// 	});
// });
navigator.mediaDevices.getUserMedia({video:true, audio:false})
.then(function(mediaStream) {

peer.on('call', function(call) {
	// Answer the call, providing our mediaStream
	call.answer();
	console.log("connected")
	call.on('stream', function(stream) {
		// if(call.metadata == 'webcam'){
		// 	videoOfDrawer.srcObject = stream
		// }
		// if(call.metadata == 'canvas'){
		// 	videoOfDrawerCanvas.srcObject = stream
		console.log("got stream")
		// }
		godVideo.srcObject = stream
	});
});

})

