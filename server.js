var request = require('request');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var yelp = require('yelp');

var app = express();

var port = process.env.PORT || 8080;

//Add middleware to the application stack
app.use(express.static(__dirname + '/client'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Post request that links to yelpsearchAPI functions
app.post('/yelpSearch', function(req, res) {
  yelp.searchYelp(req.body[0], res);
});

app.listen(port, function() {
  console.log('Listening on port:', port);
});

module.exports = app;