import React from "react"
import { Widget, addResponseMessage  } from 'react-chat-widget';
import ChatIcon from 'assets/Landing/chat.png'

import './Chat.scss';
import 'react-chat-widget/lib/styles.css';

const Chat = () => {
  

  const handleNewUserMessage = (newMessage) => {
    console.log(newMessage);
    const sessionId = Math.random().toString(36).slice(-5);

    const dialogflowAPI = 'http://localhost:5001/remote-hq/us-central1/dialogflowGateway';
    const requestBody = {
      "sessionId": sessionId,
      "queryInput": {
        "text": {
          "text": "find the figma file from yesterday",
          "languageCode": "en-US",
        }
      }
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
      addResponseMessage(newMessage + " yay");
    })

  }

  return (
    <Widget 
      handleNewUserMessage={handleNewUserMessage}
      profileAvatar={ChatIcon}
      title="RemoteHQ"
      subtitle="Hi Connor, how can I help you?"
    />
  )
}

export default Chat;