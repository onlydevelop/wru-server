const mongoose = require('mongoose');
const dateFormat = require('dateformat');

// Location Schema
const locationSchema = mongoose.Schema({
	sha1:{
		type: String,
		required: true
	},
	time:{
		type: Number,
		required: true
	},
	latitude:{
		type: Number,
		required: true
	},
	longitude:{
		type: Number,
		required: true
	},
	create_date:{
		type: String,
		default: dateFormat(new Date(), "yyyymmddhhMM")
	}
});

const Location = module.exports = mongoose.model('Location', locationSchema);

// Get Location by sha1
module.exports.getLocation = (sha1, time, callback) => {
	Location.findOne({sha1: sha1, time: time}, callback);
}

// Add Location
module.exports.addLocation = (location, callback) => {
	Location.create(location, callback);
}

// Update Location
module.exports.updateLocation = (sha1, location, options, callback) => {
	var query = {sha1: sha1, time: location.time};
	var update = {
		latitude: location.latitude,
		longitude: location.longitude,
		time: location.time,
		create_date: location.create_date
	}
	User.findOneAndUpdate(query, update, options, callback);
}

// Remove Location
module.exports.removeLocation = (sha1, callback) => {
	var query = {sha1: sha1};
	Location.remove(query, callback);
}
