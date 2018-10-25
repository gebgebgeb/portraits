const express = require("express");
const port = process.env.PORT || 9000;
const app = express();
const server = app.listen(port);

app.use(express.static('build'))

let allDrawerIds = []
let allSitterIds = []
let allGodViewIds = []

let generateId = ()=>{
	return Math.floor(Math.random() * 1000)
}

app.get("/", (req, res) => {
	let drawerId = generateId()
	let sitterId = generateId()
	allDrawerIds.push(drawerId)
	allSitterIds.push(sitterId)
	console.log(allDrawerIds)
	res.redirect("/matcher.html?sitterId=" + sitterId + "&drawerId=" + drawerId);
});

let lastSitterId = null

app.get("/nextAvailablePage", (req, res) => {
	console.log(lastSitterId)
	if(lastSitterId === null){
		lastSitterId = generateId()
		allSitterIds.push(lastSitterId)
		res.redirect('/sitter.html?sitterId=' + lastSitterId)
	}else{
		let drawerId = generateId()
		allDrawerIds.push(drawerId)
		res.redirect('/drawer.html?sitterId=' + lastSitterId + '&drawerId=' + drawerId)
		lastSitterId = null
	}
})

app.get("/godView", (req, res) => {
	godViewId = generateId()
	allGodViewIds.push(godViewId)
	res.redirect('/godview.html?godViewId=' + godViewId + '&allDrawerIds=' + JSON.stringify(allDrawerIds))
})


//Peer server instantiation
const ExpressPeerServer = require('peer').ExpressPeerServer;
const peerServerOptions = {
  debug: true
	, key:'peerjs'
}
const peerserver = ExpressPeerServer(server, peerServerOptions);

app.use('/api', peerserver);
