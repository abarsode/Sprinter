//Main server file
var express = require('express');

//Created a express applicatiom
var app = express();

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

userRoute.use(function(req, res, next) {
	if (req.path === '/')
		res.send("You have reached users's page");
	else if (req.path === '/projects')
		res.send("You have reached the users's projects page");
	else
		res.redirect('/user');
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

//Add the routes to the application
app.use('/', homeRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);
app.use('/project', projectRoute);

app.listen(4000);
console.log('Server running on port 4000');