# DHBW Rapla on Google
DHBW Rapla is an app on *Actions on Google* which provides you with information from your Rapla. The app is available through *Google Assistant*, which makes it accessible form different surfaces such as smartphones or Google Home.

*Rapla* is the central planning tool used by the Baden-Wurrtemberg Corporative State University (DHBW) in Karlsruhe, Germany. Amongst other things, all lectures for each class are in Rapla, thus Rapla is effectively the timetable for each student.

---

The app itself is built with Google's Dialogflow and Firebase Functions. This repository contains the configuration of the Dialogflow agent and the source code of the functions in the respective directories.

### Copyright notice

Although I provide the source code as open source under the MIT License, I kindly ask you to not republish it to Actions on Google, as there is no need for it to exist twice. You can however create a project for your testing purposes (see Dialogflow Docs for instructions) and I will gladly accept your contributions.

### Notes for development
According to [the Dialogflow Guide](https://developers.google.com/actions/dialogflow/first-app)
- NodeJS and `npm install -g firebase-tools`
- Initialize Firebase in the root directory of this repository, however work with Firebase functions in the functions/ dir
- ZIP the contents of agent/ to upload the agent to Dialogflow
