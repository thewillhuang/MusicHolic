/*jshint node: true*/
'use strict';

var express = require('express');
<<<<<<< HEAD
var mongoose = require('mongoose');
=======
var app = express();
>>>>>>> master
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('superagent');
<<<<<<< HEAD
var app = express();
var uri = 'mongodb://simonkim:12qwaszx@ds053080.mongolab.com:53080/musicholic';
=======
>>>>>>> master

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(uri);

app.post('/api/song', function(req, res) {
  var url = 'http://MusicHolic.herokuapp.com/api';

  request
    .get(url)
    .end(function(err, songData) {
      var parsedData = JSON.parse(songData.text);

      res.json(parsedData);
    });
});

require('./routes/songs_routes')(app);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started on port: %d', port);
});