
/*
 * GET home page.
 */

var UserSchema = require('../schemas/user');

module.exports = function (users) {
	var user = require('../user');


	for(var id in users) {
		users[id] = user(users[id]);
	}

	var functions = {};

	functions.index = function(req, res){
		res.render('index', {
			title: 'menu',
			users: users
		})
	};

	functions.user = function(req, res){
		var id = req.param('id');

		req.session.lastNumber = id;

		if (typeof users[id] === 'undefined') {
			res.status(404).json({status: 'error'});
		} else {
			res.json(users[id].getInformation());
		}
	};

	functions.addActualDate = function (req, res) {
		var id = req.param('id');

		if (typeof users[id] === 'undefined') {
			res.status(404).json({status: 'error'});
		} else {
			users[id].addActualDate();

			var record = new UserSchema(
				users[id].getInformation()
			);

			record.save(function(err) {
				if (err) {
					console.log(err);
					res.status(500).json({status: 'err'});
				} else {
					res.json({status: 'success'});
				}
			});

			res.json({status: 'done'});
		}
	};

	functions.list = function (req, res) {
		res.render('list', {
			title: 'All Users', 
			users: users
		});
	};

	return functions;
};
