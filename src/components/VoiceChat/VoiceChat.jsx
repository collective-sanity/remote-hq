import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useKeyPress } from 'hooks/useKeyPress';
import RingLoader from "react-spinners/RingLoader";
import BeatLoader from "react-spinners/BeatLoader";

import { detectIntent } from 'shared/dialogflow';

import './VoiceChat.scss';

const VoiceChat = () => {
  const triggerVoiceChat = useKeyPress(" ", true);
  const [openVoiceChat, setOpenVoiceChat] = useState(false);
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log("Not supported!");
  }

  useEffect(() => {
    if (triggerVoiceChat) {
      setOpenVoiceChat(!openVoiceChat);
    }
  }, [triggerVoiceChat]);

  useEffect(() => {
    resetTranscript();
    if (openVoiceChat) {
      SpeechRecognition.startListening();
    }
  }, [openVoiceChat, resetTranscript]);

  // On listening stop
  useEffect(() => {
    if (!listening && transcript.length > 0) {
      detectIntent(transcript);
      setTimeout(() => {
        console.log("DONE WITH DIALOGFLOW");
        setOpenVoiceChat(false);
      }, 1000);
    } else if (!listening && transcript.length === 0) {
      setOpenVoiceChat(false);
    }
  }, [listening, transcript])

  if (openVoiceChat) {
    return (
      <div className="VoiceChat__container">
        <p className="VoiceChat__prompt">&nbsp;{transcript}&nbsp;</p>
        <p className="VoiceChat__prompt">How can I help you?</p>
        <div className="VoiceChat__icon">
          {listening ? 
            <RingLoader
              color={"#ffffff"}
              loading={listening}
            />
          :
            <BeatLoader
              color={"#ffffff"}
              loading={!listening}
            />
          }
        </div>
      </div>
    )
  } else {
    return (
      <></>
    )
  }
}

export default VoiceChat;