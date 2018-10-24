var socket = io.connect('http://localhost:9000/serve');
// var stream = ss.createStream();
let godVideo = document.getElementById('godVideo') 

// ss(socket).emit('portrait', canvasStream)

socket.on('connect',function(){      
	ss(socket).on('portrait', function(stream, data) {
		console.log(stream)
		console.log(data)
		godVideo.srcObject = stream
	})
})
