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
  ]
}
export const parseIntent = (intent, parameters, createFolder, createLink) => {
  console.log(intent, parameters);
}

export const detectIntent = async (inputText, prevSessionId) => {
  let sessionId = Math.random().toString(36).slice(-5);

  // Continue the previous conversation
  if (prevSessionId !== "") {
    sessionId = prevSessionId;
  }

  const dialogflowAPI = 'http://localhost:5001/remote-hq/us-central1/dialogflowGateway';

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