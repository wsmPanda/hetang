var multipart = require('connect-multiparty')
var mongoose = require('mongoose')
var User = require('../db/users')

function router(app) {
	app.get("/users", function(req, res) {
		User.find({}, function(err, user) {
			if (err) {return err;}

			res.json({success: true, data: user});
		})
	})

	app.post("/users/update", multipart(), function(req, res) {
		if (req.body.id) {
			console.log(req.body)
			User.update({id: req.body.id}, req.body, function(err, user) {
				if (err) {return console.log(err);}

				console.log('user')
				console.log(user)
				res.json({success: true})
			})
		} else {
			console.log('new')
			var _user = new User(req.body);

			_user.save(function(err, user) {
				if (err) {
					console.log(err);
					res.json({success: false});
					return 0;
				} else {
					res.json({success: true, data: user});
				}
			})
		}
	})
	app.post("/users/delete", function(req, res) {
		var IDArray = JSON.parse(req.body.data);
		console.log(typeof IDArray)

		User.remove({id: {$in: IDArray}}, function(err, users) {
			if (err) {
				console.log(err);
				return res.json({"success": false})
			} else {
				console.log('delete success');
				res.json({"success": true})
			}

		})
	})
}

module.exports = router;