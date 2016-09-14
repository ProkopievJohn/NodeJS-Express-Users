module.exports = function (users, db) {
	var express = require('express');
	var MongoStore = require('connect-mongo')(express);
	var routes = require('./routes')(users);
	var path = require('path');	
	var app = express();


	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.session({
		secret: 'keyboard cat',
		store: new MongoStore({
			mongoose_connection: db
		})
	}));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(function (req, res, next) {
		res.set('X-Powered-By', 'Users Program');
		next();
	});
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));


	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}


	app.get('/', routes.index);
	app.get('/user/:id', routes.user);
	app.put('/user/:id/addActualDate', routes.addActualDate);
	app.get('/list', routes.list);

	return app;
}


