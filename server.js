//Main server file
var express = require('express');

//Created a express applicatiom
var app = express();

//Define our routes here.
var homeRoute = express.Router();
var adminRoute = express.Router();
var userRoute = express.Router();

// Add Route middleware. This will be invoked before each call
// to the home route. This is useful in intercepting the requests
// and processing the request before the route.

homeRoute.use(function(req, res, next){
	console.log("HOME-METHOD:" + req.method + " URL:" + req.url);
	next();
});

adminRoute.use(function(req, res, next){
	console.log("ADMIN-METHOD:" + req.method + " URL:" + req.url);
	next();
});

//Setup the routes
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

//Add the routes to the application
app.use('/',homeRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);

app.listen(4000);
console.log('Server running on port 4000');