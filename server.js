//Main server file
var express = require('express');

//Created a express applicatiom
var app = express();

//Define our routes here.
var homeRoute = express.Router();
var adminRoute = express.Router();
var userRoute = express.Router();
var projectRoute = express.Router();

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

projectRoute.get('/', function(req, res){
	res.sendStatus(404);
});

projectRoute.get('/:name', function(req, res){
	var name = req.params.name;
	var regex = /^[A-Za-z]*$/;
	if (regex.test(name))
		res.send("You have reached Project:" + name + " page");
	else
		res.sendStatus(400);
});

/* Alternate way to define a route. Notice we can chain the methods. */
app.route('/login')
	/* process GET request on http://localhost:4000/login */
	.get(function(req, res){
		res.send("This is login GET request");
	})
	/* process POST request on http://localhost:4000/login */
	.post(function(req, res){
		res.send("This is login POST request");	
	});

//Add the routes to the application
app.use('/',homeRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);
app.use('/project', projectRoute);

app.listen(4000);
console.log('Server running on port 4000');