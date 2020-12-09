import React, { useState } from "react"
import { Widget, addResponseMessage  } from 'react-chat-widget';
import ChatIcon from 'assets/Landing/chat.png'
import { useStateMachine } from 'hooks/useStateMachine';

import './Chat.scss';
import 'react-chat-widget/lib/styles.css';

const Chat = () => {
  const [continueSession, setContinueSession] = useState("");
  const { runStateMachine } = useStateMachine();

  const handleNewUserMessage = (newMessage) => {
    runStateMachine(newMessage, continueSession).then((result) => {
      if (result.continueSession) {
        setContinueSession(result.sessionId);
      } else {
        setContinueSession("");
      }
      addResponseMessage(result.responseText);
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