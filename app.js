var express = require("express");
var port = process.env.PORT || 3000;

var app = express();

app.use(express.static('build'))

app.get("/", (req, res) => {
 res.sendFile(__dirname + "/build/index.html");
});

app.listen(port, () => {
	console.log("Server listening on port "+port)
})
