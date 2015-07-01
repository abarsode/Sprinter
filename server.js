//Main server file
var express = require('express');

//Created a express applicatiom
var app = express();

var homeRoute = express.Router();
var adminRoute = express.Router();
var userRoute = express.Router();

homeRoute.get('/', function(req, res){
	res.send("You have reached the home page");
});

homeRoute.get('/login', function(req, res){
	res.send("You have reached the login page");
});

homeRoute.get('/about', function(req, res){
	res.send("You have reached the About page");
});

adminRoute.get('/', function(req, res){
	res.send("You have reached admin page");
});

adminRoute.get('/projects', function(req, res){
	res.send("You have reached admin's Projects page");
});

userRoute.get('/', function(req, res){
	res.send("You have reached user page");
});

userRoute.get('/projects', function(req, res){
	res.send("You have reached user's Projects page");
});

app.use('/',homeRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);

app.listen(4000);
console.log('Server running on port 4000');