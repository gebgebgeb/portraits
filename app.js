const express = require("express");
const port = process.env.PORT || 9000;
const app = express();
const server = app.listen(port);

app.use(express.static('build'))
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/build/index.html");
});

var io = require('socket.io').listen(80);
var ss = require('socket.io-stream');
var path = require('path');

let portraitStream
 
io.of('/user').on('connection', function(socket) {
  ss(socket).on('portrait', function(stream, data) {
    portraitStream = stream
  })
})

app.get('/godMode', (req,res)=> {
	ss(socket).emit('portrait', canvasStream)
	io.of('/').on('connection', function (socket) {
    ss(socket).on('hot', function (stream, data) {
        const _stream = ss.createStream();
        ss(socket).emit('hot', _stream);
        stream.pipe(_stream);
    });
});
})


let sitterId = null

app.get("/nextAvailablePage", (req, res) => {
	console.log(sitterId)
	if(sitterId === null){
		sitterId = Math.floor(Math.random() * 1000)
		res.redirect('/sitter.html?sitterId=' + sitterId)
	}else{
		let drawerId = Math.floor(Math.random() * 1000)
		res.redirect('/drawer.html?sitterId=' + sitterId + '&drawerId=' + drawerId)
		sitterId = null
	}
})


//Peer server instantiation
const ExpressPeerServer = require('peer').ExpressPeerServer;
const peerServerOptions = {
  debug: true
	, key:'peerjs'
}
const peerserver = ExpressPeerServer(server, peerServerOptions);

app.use('/api', peerserver);
