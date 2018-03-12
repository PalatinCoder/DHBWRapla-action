'use strict';

exports.setRaplaUrl = setRaplaUrl;
exports.tellRaplaUrl = tellRaplaUrl;
exports.deleteRaplaUrl = deleteRaplaUrl;

function setRaplaUrl(app) {
  let user = app.getArgument('rapla-user');
  let file = app.getArgument('rapla-file');
  
  let url = `https://rapla.dhbw-karlsruhe.de/rapla?page=iCal&user=${user}&file=${file}`;
  app.userStorage.raplaurl = url;
  app.tell(`Okay, ich habe deine Rapla URL ${url} gespeichert. Kann ich sonst noch etwas für dich tun?`);
}

function tellRaplaUrl(app) {
  app.tell(`Ich habe folgende Rapla URL gespeichert: ${app.userStorage.raplaurl}. Kann ich sonst noch etwas für dich tun?`);
}

function deleteRaplaUrl(app) {
  app.userStorage.raplaurl = "";
  app.tell('Okay, ich habe deine Rapla URL gelöscht. Kann ich sonst noch etwas für dich tun?');
}
