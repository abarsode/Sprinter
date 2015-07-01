//Main server file
var express = require('express');

//Created a express applicatiom
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

// APP CONFIGURATION 
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
   	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
   	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
 		Authorization');
   	next();
 });

app.use(morgan('sprinter'));

//Define our routes here.
var homeRoute = express.Router();
var adminRoute = express.Router();
var userRoute = express.Router();
var projectRoute = express.Router();

/* Add Route middleware. Process the routes here.
 Advantage here is we can ignore/redirect all other
 requests. '/', '/login', '/about' are valid routes, for
 all other routes - redirect to homepage. */

homeRoute.use(function(req, res, next) {
	if (req.path === '/')
		res.send("You have reached the home page");
	if (req.path === '/login' && req.method === 'GET')
		res.send("You have reached the login page");
	if (req.path === '/about')
		res.send("You have reached the about page");

	next();	
});

adminRoute.use(function(req, res, next) {
	if (req.path === '/')
		res.send("You have reached Admin's page");
	else if (req.path === '/projects')
		res.send("You have reached the Admin's projects page");
	else
		res.redirect('/admin');
});

userRoute.get('/', function(req, res){
	res.json({message:"list of users"});
});

userRoute.get('/:id', function(req, res){
	var uid = req.params.id;
	var regex = /^[0-9]*$/;
	if (regex.test(uid))
		res.send("You have reached User ID:" + uid + " page");
	else
		res.sendStatus(400);
});


projectRoute.get('/', function(req, res){
	res.send("list of projects");
});

projectRoute.get('/:name', function(req, res){
	var name = req.params.name;
	var regex = /^[A-Za-z]*$/;
	if (regex.test(name))
		res.send("You have reached Project:" + name + " page");
	else
		res.sendStatus(400);
});

//Add the routes to the application
app.use('/', homeRoute);
app.use('/admin', adminRoute);
app.use('/users', userRoute);
app.use('/projects', projectRoute);

app.listen(4000);
console.log('Server running on port 4000');