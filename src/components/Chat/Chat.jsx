import React, { useState, useContext } from "react"
import { Widget, addResponseMessage  } from 'react-chat-widget';
import ChatIcon from 'assets/Landing/chat.png'
import { detectIntent, parseIntent } from 'shared/dialogflow';
import { useStateMachine } from 'hooks/useStateMachine';
import ControlContext from 'shared/control-context'

import './Chat.scss';
import 'react-chat-widget/lib/styles.css';

const Chat = () => {
  const [continueSession, setContinueSession] = useState("");
  const { createLink, createFolder } = useContext(ControlContext);
  const { runStateMachine } = useStateMachine();


  const handleNewUserMessage = (newMessage) => {
    runStateMachine(newMessage, continueSession).then((result) => {
      console.log(result);
      addResponseMessage(result.responseText);
    });

    // detectIntent(newMessage, continueSession).then(({ result, sessionId }) => {
    //   addResponseMessage(result.fulfillmentText);

    //   if (!result.allRequiredParamsPresent) {
    //     setContinueSession(sessionId);
    //   } else {
    //     setContinueSession("");
    //     parseIntent(result.intent, result.parameters, createFolder, createLink);
    //   }
    // });
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