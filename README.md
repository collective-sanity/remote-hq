# RemoteHQ

RemoteHQ is a web application designed to help remote teams organize their workflows. With RemoteHQ, users can create teams and add other members to them. These teams can create dedicated workspaces within which they can create, store, and view Google Docs, Google Sheets, Google Slide decks, Figma links, and web links, all without leaving the application. In addition, we integrated a chatbot to help with all of these functions for voice, text, and speech-to-text inputs. The voice parts of the bot have real time speech to text and can be seen as the user is speaking. The voice chat also has text-to-speech for responses.

This is a final project for SSUI (05-631) at CMU.

Team Members: Karthick Shankar, Connor Shannon, Nathan Jen, Victor Grajski

The site is deployed at: https://remote-hq.web.app/


## Installation Guide
Ensure you have node.js and npm installed (https://nodejs.org/en/) 

1. Clone the git repository

    `git clone https://github.com/collective-sanity/remote-hq.git`

2. Navigate to the remote-hq folder

    `cd remote-hq`

3. Add the provided .env file to the root directory

4. Install all the required packages

    `npm install`

5. Start the application

    `npm start`

6. Open `localhost:3000` on Chrome (Note: Voice Chat not supported on other browsers due to to the limitation of the Web Speech API on HTML5)

## Packages and Technologies Used
* [Google Drive API](https://developers.google.com/drive) 
* [Dialogflow](https://dialogflow.cloud.google.com/) 
* [Firebase](https://firebase.google.com/) 
* [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) 
* [react-speech-recognition](https://www.npmjs.com/package/react-speech-recognition) 
* [react-speech-kit](https://www.npmjs.com/package/react-speech-kit) 
* [react-chat-widget](https://www.npmjs.com/package/react-chat-widget) 
* [react-firebase-hooks](https://www.npmjs.com/package/react-firebase-hooks) 
* [Styled Components](https://github.com/styled-components/styled-components) 
* [node-sass](https://www.npmjs.com/package/node-sass)
* [reactstrap](https://reactstrap.github.io/)
