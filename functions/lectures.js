'use strict';

function getLectures(app) {
  let date = app.getArgument('date');
  app.tell('Tut mir leid, ich kenne deinen Vorlesungsplan für ' + date + ' noch nicht. Aber ich arbeite daran.');
}

exports.getLectures = getLectures;
