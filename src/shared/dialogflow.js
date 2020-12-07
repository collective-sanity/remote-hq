export const detectIntent = async (inputText) => {
  const sessionId = Math.random().toString(36).slice(-5);
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

  fetch(dialogflowAPI, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody),
  })
  .then((response => response.json()))
  .then(result => {
    console.log(result);
  })

}