const express = require("express");
const port = process.env.PORT || 9000;
const app = express();
const server = app.listen(port);

app.use(express.static('build'))
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/build/index.html");
});

// const sitterId

// app.get("/nextAvailablePage", (req, res) => {
// 	sitterId = MATH.random()


//Peer server instantiation
const ExpressPeerServer = require('peer').ExpressPeerServer;
const peerServerOptions = {
  debug: true
	, key:'peerjs'
}
const peerserver = ExpressPeerServer(server, peerServerOptions);

app.use('/api', peerserver);