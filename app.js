const express = require("express");
const port = process.env.PORT || 9000;
const app = express();
const server = app.listen(port);

app.use(express.static('build'))
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/build/index.html");
});

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
