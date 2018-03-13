'use strict';

const App = require('actions-on-google').DialogflowApp;
const express = require('express');
const bodyParser = require('body-parser');

let app = express();
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json({type: 'application/json'}));

app.post('/', function(request, response) {  
  const app = new App({request, response});
  const lectures = require('./lectures');
  const raplaurl = require('./rapla-url');
  
  let actionMap = new Map();
  actionMap.set('request.lectures', lectures.getLectures);
  actionMap.set('set.rapla-url', raplaurl.setRaplaUrl);
  actionMap.set('delete.rapla-url', raplaurl.deleteRaplaUrl);
  actionMap.set('tell.rapla-url', raplaurl.tellRaplaUrl);
  app.handleRequest(actionMap);
});

var server = app.listen(app.get('port'), function() {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit');
});
