import React, { useState } from "react"
import { Widget, addResponseMessage  } from 'react-chat-widget';
import ChatIcon from 'assets/Landing/chat.png'
import { detectIntent } from 'shared/dialogflow';

import './Chat.scss';
import 'react-chat-widget/lib/styles.css';

const Chat = () => {
  const [continueSession, setContinueSession] = useState("");

  const handleNewUserMessage = (newMessage) => {
    detectIntent(newMessage, continueSession).then(({ result, sessionId }) => {
      console.log("Got it on the then::", result);
      console.log("Old session ID: ", sessionId);
      addResponseMessage(result.fulfillmentText);

      if (!result.allRequiredParamsPresent) {
        setContinueSession(sessionId);
      } else {
        setContinueSession("");
      }
    });
  }

  return (
    <Widget 
      handleNewUserMessage={handleNewUserMessage}
      profileAvatar={ChatIcon}
      title="RemoteHQ"
      subtitle="Hi, how can I help you?"
    />
  )
}

export default Chat;