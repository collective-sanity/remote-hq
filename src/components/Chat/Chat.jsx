import React, { useEffect, useState } from "react"
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import ChatIcon from 'assets/Landing/chat.png'
import { useStateMachine } from 'hooks/useStateMachine';
import { useKeyPress } from 'hooks/useKeyPress';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import './Chat.scss';
import 'react-chat-widget/lib/styles.css';

const Chat = () => {
  const [continueSession, setContinueSession] = useState("");
  const { runStateMachine } = useStateMachine();
  const triggerTextChatAudio = useKeyPress(" ", true, true);
  const { transcript } = useSpeechRecognition();

  useEffect(() => {
    if (triggerTextChatAudio) {
      SpeechRecognition.startListening();
    }
  }, [triggerTextChatAudio]);

  useEffect(() => {
    if (transcript) {
      let userInput = document.getElementsByClassName("rcw-new-message")[0];
      if (userInput) {
        userInput.value = transcript;
      }
    }
  }, [transcript]);

  const handleNewUserMessage = (newMessage) => {
    SpeechRecognition.stopListening();
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