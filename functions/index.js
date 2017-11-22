'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

const NAME_ACTION = 'request.lectures';
const DATE_ARGUMENT = 'date';

exports.dhbwrapla = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));
  
  function getLectures(app) {
    let date = app.getArgument(DATE_ARGUMENT);
    app.tell('Tut mir leid, ich kenne deine Vorlesungen für ' + date + ' noch nicht. Aber ich lerne noch.');
  }
  
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, getLectures);
  
  app.handleRequest(actionMap);
});