var express = require("express");
var port = process.env.PORT || 9000;
var ExpressPeerServer = require('peer').ExpressPeerServer;
var app = express();
var options = {
    debug: true
}

app.use(express.static('build'))

app.get("/", (req, res) => {
 res.sendFile(__dirname + "/build/index.html");
});

var server = app.listen(port);

var peerserver = ExpressPeerServer(server, options);

app.use('/api', peerserver);