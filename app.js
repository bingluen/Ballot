/* Module */
var express = require('express');
var bodyParser = require('body-parser');
var connectMultiparty = require('connect-multiparty');

/* require router */
var ballot = require('./router/ballot');
var public = require('./router/public');


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(connectMultiparty())

app.use('/ballot', ballot);
app.use('/', public);

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    //var err = new Error('Not Found');
    //err.status = 404;
    //next(err);
    console.log(req.path);
    res.status(404).json({
    	messages: "404 Not Found"
    });
});
*/

module.exports = app;