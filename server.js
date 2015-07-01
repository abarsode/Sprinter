//Main server file
var express = require('express');

//Created a express applicatiom
var app = express();

var homeRoute = express.Router();

homeRoute.get('/', function(req, res){
	res.send("You have reached the home page");
});

homeRoute.get('/login', function(req, res){
	res.send("You have reached the login page");
});

homeRoute.get('/about', function(req, res){
	res.send("You have reached the About page");
});

app.use('/',homeRoute);

app.listen(4000);
console.log('Server running on port 4000');