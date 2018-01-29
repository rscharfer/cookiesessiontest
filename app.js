const lrsinterface = require('./lrsinterface.js');
const postStatement = lrsinterface.postStatement;

const express = require('express')
// easily build paths to files in this application / use the join() method
const path = require('path')
// parse the body of incomeing requests
const bodyParser = require('body-parser');
// used to write files to the server
const fs = require('fs')
// creates random strings for keys
const randomstring = require("randomstring");
// create an app that processes incoming http requests
const app = express()

const cookieSession = require('cookie-session')

app.set('trust proxy', 1)
app.use(cookieSession({
  name: 'session',
  keys: [randomstring.generate(), randomstring.generate()],

}))

// lets Express know where the "views" are and what "view engine" we are using
app.set('views', path.join(__dirname,'/views'))
app.set('view engine', 'pug')


// parse one type of request.body(json)
app.use(bodyParser.json()); 
// parse another type of request.body(url encoded)
app.use(bodyParser.urlencoded({ extended: true }));


// lets Express know that the public folder is called "public"
app.use(express.static('public'))

// needs to be called to start the server
app.listen(3000, () => console.log('Example app listening on port 3000!'))

// if any request that comes in has a body, it should already be parsed because of bodyParser and be in json form
// if any request that comes in has a body, set the "email" and "password" value from the parsed body and the path of the request to res.locals
// what are we going to do res.locals?
// is res.locals only alive until the response is sent or alive for all following http requests?
app.use(function(req, res, next){
	if(req.body){
		
		res.locals.email = req.body["email"];
  		res.locals.password = req.body["password"];
  		

  	}
	next();
});

// get the allowed users based on the req.path
// if the email and password entered match one of the allowed users, move to next middleware and return out of function
// if the user is not in the users.json for that path a 401 response is returned the following middleware is not run
function isAuthenticated(req, res, next) {

	let allowedUsers;
	switch(req.path){
		case "/admin":
			allowedUsers = require('./admin/users.json')
			break;
		case "/course_1":
			allowedUsers = require('./course_1/users.json');
			break;
		case "/course_2":
			allowedUsers = require('./course_2/users.json');
			break;
		case "/course_3":
			allowedUsers = require('./course_3/users.json');
			break;
		default:
			break;
	}
	for (allowedUser of allowedUsers){
	
		if (res.locals.email === allowedUser.userName && res.locals.password === allowedUser.password){
			next()
			return; 	
		} 
	}
	res.status(401).send('unauthorized user'); 
}

app.get('/', (req, res) => res.sendFile(path.join(__dirname,'/index.html')))
app.get('/favicon.ico', (req,res)=>res.sendFile(path.join(__dirname,"favicon.gif")))
app.get('/:course/', (req, res) => res.sendFile(path.join(__dirname,`/${req.params.course}/index.html`)))
app.get('/course_1/course/', (req, res) => {
	req.session.name = "Ryan Scharfer"
	res.sendFile(path.join(__dirname,`/course_1/course/index.html`))
})
app.get('/course_2/course/', (req, res) => res.sendFile(path.join(__dirname,`/course_2/course/story_html5.html`)))
app.get('/course_3/course/', (req, res) => res.sendFile(path.join(__dirname,`/course_3/course/res/index.html`)))
// For files in the "ar" folder of the Captivate exports
app.get('/:course/ar/:file', (req, res) => res.sendFile(path.join(__dirname,`/${req.params.course}/course/ar/${req.params.file}`)))
// For files in the "dr" folder of Captivate exports
app.get('/:course/dr/:file', (req, res) => res.sendFile(path.join(__dirname,`/${req.params.course}/course/dr/${req.params.file}`)))
// For files in the "assets" folder of Captivate exports one folder deep
app.get('/:course/assets/:subfolder/:file', (req, res) => res.sendFile(path.join(__dirname,`/${req.params.course}/course/assets/${req.params.subfolder}/${req.params.file}`)))
// For files in the "assets" folder of Captivate exports two folders deep
app.get('/:course/assets/:subfolder1/:subfolder2/:file', (req, res) => res.sendFile(path.join(__dirname,`/${req.params.course}/course/assets/${req.params.subfolder1}/${req.params.subfolder2}/${req.params.file}`)))
// For goodbye.html in the Captivate export
app.get('/course_1/goodbye.html', (req, res) => res.sendFile(path.join(__dirname,`/course_1/course/goodbye.html`)))


app.get('/admin/dashboard', (req, res) => res.sendFile(path.join(__dirname,"admin/dashboard.html")))
app.get('/admin/reporting', (req, res) => res.sendFile(path.join(__dirname,"admin/reporting.html")))
app.get('/admin/lrsconfig', (req, res) => res.sendFile(path.join(__dirname,"admin/lrsconfig.html")))

// this callback is called after all post request once isAuthenticated is called
// create a session object of the person who just logged in and add it to the current sessions object
// sessions.json represents everyone who is logged in maps an identifier to them
// can they disinigrate on their own after a certain amount of time like a cookie?


.post('/xapi',(req, res) => {
	const name = req.body["name"];
	const verb = req.body["verb"];
	const object = req.body["object"];
	const context = req.body["context"];
	req.session.name = name;
	postStatement(name, verb, context, object);
	res.send("There was a successful post");
})
app.post('*', isAuthenticated, (req,res) => {

	req.session.name = "User Name";
	console.log("where is the cookie?")
	res.end()
})











	


