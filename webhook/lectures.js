'use strict';

const IcalExpander = require('ical-expander');
const request = require('request');

exports.getLectures = getLectures;

function getLectures(app) {
  let date = app.getArgument('date');
  
  request('https://rapla.dhbw-karlsruhe.de/rapla?page=iCal&user=vollmer&file=tinf15b3', function(error, response, body) {
    if (error || response.statusCode != 200) {
      app.tell('<speak>Ich kann deinen Vorlesungsplan nicht abrufen. Bitte überprüfe deine Rapla <say-as interpret-as="characters">URL</say-as></speak>');
      return;
    }
     app.tell(buildAnswer(body, date));
  });
}

function buildAnswer(ics, date) {
  const icalExpander = new IcalExpander({ ics, maxIterations: 10 });
  const events = icalExpander.between(new Date(date+'T00:00:00.000Z'), new Date(date+'T23:59:59.000Z'));
  
  const mappedEvents = events.events.map(e => ({ startDate: e.startDate, summary: e.summary }));
  const mappedOccurrences = events.occurrences.map(o => ({ startDate: o.startDate, summary: o.item.summary }));
  const allEvents = [].concat(mappedEvents, mappedOccurrences);
  
  if (allEvents.length == 0) return "Du hast am " + date + " keine Vorlesungen";
  
  allEvents.sort(function(a, b) {
    return a.startDate.toJSDate() - b.startDate.toJSDate();
  });
  
  var answer = "<speak>Folgende Vorlesungen stehen für " + date + " in Rapla:<p>";
  allEvents.map((element, index, array) => { 
    if (index == array.length -1) answer += "und";
    answer += "<s>"
    answer += element.summary.replace(/ ?[A-Z0-9]{8},? ?/g,""); // Regex eliminates class names from the summary
    answer += " um " + element.startDate.toJSDate().toLocaleTimeString();
    answer += "</s>";
  });
  answer += "</p></speak>";
  return answer;
}
