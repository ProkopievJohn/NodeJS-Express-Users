#!/usr/bin/env node

var http = require('http'),
	users = require('./data'),
	db = require('./db'),
	app = require('./app')(users, db);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});