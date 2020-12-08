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