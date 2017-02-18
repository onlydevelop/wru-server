const mongoose = require('mongoose');

// Genre Schema
const userSchema = mongoose.Schema({
	sha1:{
		type: String,
		required: true
	},
	first_name:{
		type: String,
		required: true
	},
	last_name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	enable:{
		type: Boolean,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const User = module.exports = mongoose.model('User', userSchema);

// Get User
module.exports.getUser = (sha1, callback) => {
	User.findOne({sha1: sha1}, callback);
}

// Add User
module.exports.addUser = (user, callback) => {
	User.create(user, callback);
}

// Enable User
module.exports.enableUser = (user, callback) => {
	var query = {sha1: sha1};
	var update = {
		enable: true
	}
	User.findOneAndUpdate(query, update, options, callback);
}

// Update User
module.exports.updateUser = (email, user, options, callback) => {
	var query = {email: email};
	var update = {
		first_name: user.first_name,
		last_name: user.last_name,
		sha1: user.sha1,
		enable: user.enable
	}
	User.findOneAndUpdate(query, update, options, callback);
}

// Delete User
module.exports.removeUser = (sha1, callback) => {
	var query = {sha1: sha1};
	User.remove(query, callback);
}
