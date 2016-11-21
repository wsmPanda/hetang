var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var UserSchema = new mongoose.Schema({
	id: {
		type: Number,
		default: 0
	},
	name: String,
	note: String,
	status: {
		type: String,
		default: ""
	},
	"create-time": Date,
	"last-login-time": {
		type: Date,
		default: new Date()
	},
	level: {
		type: Number,
		default: 0
	}
})

UserSchema.pre('save', function(next) {
	var user = this;
	if (typeof user["create-time"] == String) {
		user["create-time"] = new Date(user["create-time"])
		console.log(user["create-time"])
	}
	next();
})

autoIncrement.initialize(mongoose.connection);
UserSchema.plugin(autoIncrement.plugin, {model: "User", field: "id"});
var User = mongoose.model('User', UserSchema)

module.exports = User