const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 3000;
const dateFormat = require('dateformat');

app.use(bodyParser.json());

Location = require('./models/location');
User = require('./models/user');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/wru');
var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Please use /api/location or /api/user');
});

app.get('/api/location/:sha1', (req, res) => {
	var sha1 = req.params.sha1;
	var time = new Date().getMinutes();
	Location.getLocation(sha1, time, (err, location) => {
		if(err){
			throw err;
		}
		res.json(location);
	});
});

app.get('/api/location/:sha1/:time', (req, res) => {
	var sha1 = req.params.sha1;
	var time = req.params.time;
	if (time == null) time = new Date().getMinutes();
	Location.getLocation(sha1, time, (err, location) => {
		if(err){
			throw err;
		}
		res.json(location);
	});
});

app.post('/api/location/:sha1', (req, res) => {
	var sha1 = req.params.sha1;
	var location = req.body;
	location.sha1 = sha1;
	location.time = new Date().getMinutes();
	location.create_date = dateFormat(new Date(), "yyyymmddhhMM");
	User.getUser(sha1, (err, existing_user) => {
		if(err){
			throw err;
		}
		if (existing_user != null) {
			Location.getLocation(location.sha1, location.time, (err, saved_location) => {
				if(err){
					throw err;
				}
				if(saved_location == null) {
					Location.addLocation(location, (err, location) => {
						if(err){
							throw err;
						}
						res.json("{'status': 'success', 'message': 'Location updated'}");
					});
				} else if (saved_location.create_date != location.create_date) {
					Location.updateLocation(sha1, location, (err, location) => {
						if(err){
							throw err;
						}
						res.json("{'status': 'success', 'message': 'Location updated'}");
					});
				} else {
						res.json("{'status': 'error', 'message': 'Location already added!'}")
				}
			});
		} else {
			res.json("{'status': 'error', 'message': 'Invalid user!'}");
		}
	});
});

// Used for testing cleanup only
/*
app.delete('/api/location/:sha1', (req, res) => {
	var sha1 = req.params.sha1;
	Location.removeLocation(sha1, (err, location) => {
		if(err){
			throw err;
		}
		res.json(location);
	});
});
*/

app.get('/api/user/:sha1', (req, res) => {
	var sha1 = req.params.sha1;
	User.getUser(sha1, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.post('/api/user/', (req, res) => {
	var input_user = req.body;
	var sha1 = input_user.sha1;
	User.getUser(sha1, (err, existing_user) => {
		if(err){
			throw err;
		}
		if (existing_user == null) {
			User.addUser(input_user, (err, user) => {
				if(err){
					throw err;
				}
				res.json(user);
			});
		} else {
			res.json(existing_user);
		}
	});
});

app.put('/api/user/:email', (req, res) => {
	var input_user = req.body;
	var email = req.params.email;
	User.updateUser(email, input_user, {}, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.delete('/api/user/:sha1', (req, res) => {
	var sha1 = req.params.sha1;
	User.removeUser(sha1, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.listen(PORT);
console.log('Running on port: ' + PORT);
