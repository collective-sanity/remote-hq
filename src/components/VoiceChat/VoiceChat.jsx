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
  const [chatbotText, setChatbotText] = useState("Hi, how can I help you?");
  const [continueSession, setContinueSession] = useState("");
  const [endOfChat, setEndOfChat] = useState(false);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    setChatbotText("Sorry, this browser is not supported. Please use RemoteHQ on Google Chrome");
  }

  useEffect(() => {
    if (triggerVoiceChat) {
      console.log("VoiceChat triggered!");
      setOpenVoiceChat(prev => !prev);
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
      detectIntent(transcript, continueSession).then(({ result, sessionId }) => {
        setChatbotText(result.fulfillmentText);
        console.log("VoiceChat result: ", result);
        if (!result.allRequiredParamsPresent 
           || result.intent.displayName === "Default Fallback Intent"
           || result.intent.displayName === "Default Welcome Intent") {
          console.log("VoiceChat not finished.");
          setContinueSession(sessionId);
          SpeechRecognition.startListening();
        } else {
          setContinueSession("");
          setChatbotText("Hi, how can I help you?");
          setEndOfChat(true);
          setTimeout(() => {
            console.log("End of conversation!");
            setOpenVoiceChat(false);
            setEndOfChat(false);
          }, 7000);
        }
      });
    } else if (!listening && transcript.length === 0) {
      console.log("VoiceChat nothing said at all!");
      setOpenVoiceChat(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening])

  if (openVoiceChat) {
    return (
      <div className="VoiceChat__container">
        <p className="VoiceChat__prompt">&nbsp;{transcript}&nbsp;</p>
        <p className="VoiceChat__prompt">{chatbotText}</p>
        <div className="VoiceChat__icon">
          {listening ? 
            <RingLoader
              color={"#ffffff"}
              loading={listening}
            />
          :
            <BeatLoader
              color={"#ffffff"}
              loading={!listening && !endOfChat}
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