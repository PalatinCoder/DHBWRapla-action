'use strict';

const IcalExpander = require('ical-expander');
const request = require('request');

exports.getLectures = getLectures;

const ssml = (template, ...inputs) => template.reduce((out, str, i) => i
  ? out + (
    inputs[i - 1]
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  ) + str
  : str
).trim().replace(/\s+/g, ' ').replace(/ </g, '<').replace(/> /g, '>');


function getLectures(app) {
  let date = app.getArgument('date');
  
  
  if (!app.userStorage.raplaurl)  {
    app.ask(ssml`<speak><s>Dazu benötige ich deine Rapla <say-as interpret-as="characters">URL</say-as></s><s>Bitte sage mir, unter welchem Benutzernamen und welcher Datei dein Rapla gespeichert ist.</s></speak>`);
    return;
  }
  
  request(app.userStorage.raplaurl, function(error, response, body) {
    if (error || response.statusCode != 200) {
      app.tell(ssml`<speak>Ich kann deinen Vorlesungsplan nicht abrufen. Bitte überprüfe deine Rapla <say-as interpret-as="characters">URL</say-as></speak>`);
      return;
    }
    app.tell(buildAnswer(body, date));
  });
}

function buildAnswer(ics, date) {
  const icalExpander = new IcalExpander({ ics, maxIterations: 10 });
  const events = icalExpander.between(new Date(date+'T00:00:00.000Z'), new Date(date+'T23:59:59.000Z'));
  
  const mappedEvents = events.events.map(e => ({ startDate: e.startDate, endDate: e.endDate, summary: e.summary }));
  const mappedOccurrences = events.occurrences.map(o => ({ startDate: o.startDate, endDate: o.endDate, summary: o.item.summary }));
  const allEvents = [].concat(mappedEvents, mappedOccurrences);
  
  if (allEvents.length == 0) return ssml`Du hast am ${date} keine Vorlesungen`;
  
  allEvents.sort(function(a, b) {
    return a.startDate.toJSDate() - b.startDate.toJSDate();
  });
  
  var answer = ssml`<speak>Folgende Vorlesungen stehen für den ${date} in Rapla:<p>`;
  allEvents.map((element, index, array) => {
    // Regex eliminates class names from the summary
    // also insert 'und' before the last element
    answer += ssml`
    ${(array.length > 1 && index == array.length-1) ? 'und':'' }
    <s>
      ${element.summary.replace(/ ?[A-Z0-9]{8},? ?/g,"")} von ${element.startDate.toJSDate().toLocaleTimeString()} bis ${element.endDate.toJSDate().toLocaleTimeString()}
    </s>`
  });
  answer += "</p></speak>";
  return answer;
}
