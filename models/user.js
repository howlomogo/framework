const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
	firstname:{
		type: String,
		required: true
	},
	lastname:{
		type: String,
		required: true
	}
});

const User = module.exports = mongoose.model('User', userSchema);

// Get Users
module.exports.getUsers = (callback, limit) => {
	User.find(callback).limit(limit);
}

// Get User
module.exports.getUserById = (id, callback) => {
	User.findById(id, callback);
}

// Add User
module.exports.addUser = (newUser, callback) => {
	User.create(newUser, callback);
}

// Delete User
module.exports.removeUser = (id, callback) => {
	var query = {_id: id};
	User.remove(query, callback);
}
