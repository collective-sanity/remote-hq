export const STATES = {
  "goToLink": [
    {name: "START"},
    {name: "GET_TEAM_NAME", skip: "currentTeam", prompt: "What team is the link in?"},
    {name: "GET_FOLDER_NAME", skip: "currentFolder", prompt: "What folder is the link in?"},
    {name: "GET_LINK_NAME", skip: "currentLink", prompt: "What is the name of the link?"},
    {name: "END", prompt: "Here is the file!"},
  ],
  "goToFolder": [
    {name: "START"},
    {name: "GET_TEAM_NAME", skip: "currentTeam", prompt: "What team is the folder in?"},
    {name: "GET_FOLDER_NAME", skip: "currentFolder", prompt: "What is the name of the folder?"},
    {name: "END", prompt: "Here is the folder!"},
  ],
  "goToTeam": [
    {name: "START"},
    {name: "GET_TEAM_NAME", skip: "currentTeam", prompt: "What is the name of the team?"},
    {name: "END", prompt: "Here is the team!"},
  ],
  "createTeam": [
    {name: "START"},
    {name: "CREATE_TEAM_NAME", skip: "createTeam", prompt: "What do you want the name of the team to be?"},
    {name: "END", prompt: "The team has been created!"},
  ],
  "createFolder": [
    {name: "START"},
    {name: "GET_TEAM_NAME", skip: "currentTeam", prompt: "What team will the folder be created in?"},
    {name: "CREATE_FOLDER_NAME", skip: "createTeam", prompt: "What do you want the name of the folder to be?"},
    {name: "END", prompt: "The folder has been created!"},
  ],
  // Disable create link because it seems weird to have a chatbot put in a URL and such
  // "createLink": [
  //   {name: "START"},
  //   {name: "GET_TEAM_NAME", skip: "currentTeam", prompt: "What team will the link be created in?"},
  //   {name: "GET_FOLDER_NAME", skip: "currentFolder", prompt: "What folder will the link be created in?"},
  //   {name: "CREATE_LINK_NAME", skip: "createLink", prompt: "What do you want the name of the link to be?"},
  //   {name: "END", prompt: "The link has been created!"},
  // ]
}
export const getVoices = () => {
  return window.speechSynthesis.getVoices();
}

export const detectIntent = async (inputText, prevSessionId) => {
  let sessionId = Math.random().toString(36).slice(-5);

  // Continue the previous conversation
  if (prevSessionId !== "") {
    sessionId = prevSessionId;
  }

  // For local usage:
  // const dialogflowAPI = 'http://localhost:5001/remote-hq/us-central1/dialogflowGateway';

  const dialogflowAPI = 'https://us-central1-remote-hq.cloudfunctions.net/dialogflowGateway';

  const requestBody = {
    "sessionId": sessionId,
    "queryInput": {
      "text": {
        "text": inputText,
        "languageCode": "en-US",
      },
    },
  }

  let resultJSON;
  let response = await fetch(dialogflowAPI, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody),
  });
  resultJSON = await response.json();

  return resultJSON;
}