'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

exports.dhbwrapla = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));
  
  const  getLectures = require('./lectures').getLectures
  
  let actionMap = new Map();
  actionMap.set('request.lectures', getLectures);
  
  app.handleRequest(actionMap);
});
