var socket = io.connect('http://localhost:9000/serve');
var stream = ss.createStream();
let godVideo = document.getElementById('godVideo') 

// ss(socket).emit('portrait', canvasStream)

ss(socket).on('portrait', function(stream, data) {
	godVideo.srcObject = stream
})