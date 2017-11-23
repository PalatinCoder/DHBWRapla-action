'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const express = require('express');
const bodyParser = require('body-parser');

let app = express();
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json({type: 'application/json'}));

app.post('/', function(request, response) {  
  const app = new App({request, response});
  const getLectures = require('./lectures').getLectures;
  let actionMap = new Map();
  actionMap.set('request.lectures', getLectures);
  app.handleRequest(actionMap);
});

var server = app.listen(app.get('port'), function() {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit');
});
