const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')

const port = process.env.PORT || 9000;
const app = express();
const server = app.listen(port);


app.use(express.static('build'))
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portraithistories')

let db = mongoose.connection
db.on('error', console.error.bind(console, 'mongo connection error'))
db.once('open', function(callback){
	console.log('database connection succeeded!')
})

let portraitSchema = new mongoose.Schema({
	canvasHeight: Number,
	canvasWidth: Number,
	mousePositionArray: Array,
	sessionId: String,
	time : { type : Date, default: Date.now }
})

let Portrait = mongoose.model('Portrait', portraitSchema)

let allDrawerIds = []
let allSitterIds = []
let allGodViewIds = []
let drawerIdsForGodViews = []

let allHistories = []

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

app.get("/previousportraits", (req, res) => {
	Portrait.find({}).limit(200).sort('-time').exec( (err, entries) => {
		let previousPortraitsArray = []
		let existingPortraitIds = []
		for (entry of entries) {
			if (existingPortraitIds.includes(entry.sessionId)) {
				continue
			} else {
				existingPortraitIds.push(entry.sessionId)
				previousPortraitsArray.push(entry)
			} 
			if (existingPortraitIds.length === 144) {
				break
			}
		}
		res.send(previousPortraitsArray)
	})
});

app.get("/previousportrait", (req, res) => {
	Portrait.findOne(req.query, (err, entry) => {
		res.send(entry)
	})
});


let lastSitterId = null

app.get("/nextAvailablePage", (req, res) => {
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
	let myData = new Portrait(req.body)
	myData.save((error, entry) => {
		if (error){
			console.error(error);
		} else{
			res.send(entry.id)
			console.log('saved!')
		}
	})
})

//Peer server instantiation
const ExpressPeerServer = require('peer').ExpressPeerServer;
const peerServerOptions = {
  debug: true
	, key:'peerjs'
}
const peerserver = ExpressPeerServer(server, peerServerOptions);

peerserver.on('connection', function(id) {
	console.log('connection') 
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
  	if (id === lastSitterId) {
  		lastSitterId = null
  	}						
})

app.use('/api', peerserver);
