var express = require('express');
var config = require('./config');
var app = express();
var port = config.port|| 3000
require('./express')(app, config);
require('http').createServer(app).listen(port, function () {
console.log("HTTP Server listening on port: %d, in %s mode", port, app.get('env'));
});
