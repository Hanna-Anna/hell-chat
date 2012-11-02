var db = require('./db');
var htutil = require('./htutil');
var mess = require('./mess-render');
var express = require('express');
var layouts = require('express-ejs-layouts');
var io = require('socket.io');
var app = express();

app.set('views', __dirname + '/../front');
app.set('view engine', 'ejs');
app.configure(function() {
	app.use(layouts);
	app.use(app.router);
	app.use(express.static(__dirname + '/../front'));
	app.use(express.errorHandler({
		dumpExceptions: true, showStack: true
	}));
});

app.get('/login', htutil.loadParams, function(req, res) {
	if (req.login && req.pass) {
		db.checkUserPass(req.login, req.pass, function(exists){
			if(exists) {
				//res.render('chat', {title: "Chat", messages: ""});
				console.log('Welcome to chat');
			}
			else {
				res.render('login', {title: "Please sign in", messages: mess.render({error: "Incorrectly entered data"})});
			}
		});
	}
	else {
		if (req.login == undefined && req.pass  == undefined) {
			res.render('login', {title: "Please sign in", messages: ""});
		}
		else {
			res.render('login', {title: "Please sign in", messages: mess.render({error: "Incorrectly entered data"})});
		}
	}
});

app.get('/registration', htutil.loadParams, function(req, res) {
	if (req.login && req.passValid) {
		db.add(req.login, req.pass, function(exists) {
			if(exists) {
				res.render('registration', {title: "Registration", messages: mess.render({error: "This login exists!"})});
			}
			else {
				res.render('reg-success', {title: "", messages: mess.render({notice: "Registration has been success"})});
			}
		});
	}
	else {
		if (req.login == undefined && req.passValid  == undefined) {
			res.render('registration', {title: "Registration", messages: ""});
		}
		else {
			res.render('registration', {title: "Registration", messages: mess.render({error: "Incorrectly entered data"})});
		}
	}
});

app.get('/404', function(req, res) {
	res.send('NOT FOUND ' + req.url);
});
 
app.listen(8080);
console.log('Listening to http://localhost:8080');