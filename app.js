const express = require("express");
const port = process.env.PORT || 9000;
const app = express();
const server = app.listen(port);

app.use(express.static('build'))

let allDrawerIds = []
let allSitterIds = []
let allGodViewIds = []
let drawerIdsForGodViews = []

let generateId = ()=>{
	let candidateId
	do{
		candidateId = Math.floor(Math.random() * 1000)
	}while(allDrawerIds.includes(candidateId) || allSitterIds.includes(candidateId) || allGodViewIds.includes(candidateId))
	return candidateId
}

app.get("/", (req, res) => {
	res.redirect("/matcher.html")
});

app.get("/friendpairs", (req, res) => {
	let drawerId = generateId()
	allDrawerIds.push(drawerId)
	let sitterId = generateId()
	allSitterIds.push(sitterId)
	res.send({'sitterId': sitterId, 'drawerId': drawerId})
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
	res.send({'godViewId': godViewId, 'allDrawerIds': drawerIdsForGodViews})
})

app.post('/saveportrait', (req,res) => {
	res.send('coollll')
})

//Peer server instantiation
const ExpressPeerServer = require('peer').ExpressPeerServer;
const peerServerOptions = {
  debug: true
	, key:'peerjs'
}
const peerserver = ExpressPeerServer(server, peerServerOptions);

peerserver.on('connection', function(id) { 
	if (allDrawerIds.includes(parseInt(id))) {
		drawerIdsForGodViews.push(parseInt(id))
		console.log("drawer connected: "+id)
	}
})

peerserver.on('disconnect', function(s_id) { 
	let id = parseInt(s_id)
	var index = allDrawerIds.indexOf(id);
	if (index > -1) {
  		allDrawerIds.splice(index, 1);
  	}
  	var index = allSitterIds.indexOf(id);
	if (index > -1) {
  		allSitterIds.splice(index, 1);
  	}	
  	var index = allGodViewIds.indexOf(id);
	if (index > -1) {
  		allGodViewIds.splice(index, 1);
  	}
  	var index = drawerIdsForGodViews.indexOf(id);
	if (index > -1) {
  		drawerIdsForGodViews.splice(index, 1);
  	}						
})

app.use('/api', peerserver);
