import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useSpeechSynthesis } from 'react-speech-kit';
import { useKeyPress } from 'hooks/useKeyPress';
import RingLoader from "react-spinners/RingLoader";
import BeatLoader from "react-spinners/BeatLoader";
import useSound from 'use-sound';
import { useStateMachine } from 'hooks/useStateMachine';

import { getVoices } from 'shared/dialogflow'
import startSound from 'assets/voice_chat_start.mp3';
import endSound from 'assets/voice_chat_end.mp3';

import './VoiceChat.scss';

const VoiceChat = () => {
  const triggerVoiceChat = useKeyPress(" ", true);
  const [openVoiceChat, setOpenVoiceChat] = useState(false);
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const [chatbotText, setChatbotText] = useState("Hi, how can I help you?");
  const [continueSession, setContinueSession] = useState("");
  const [endOfChat, setEndOfChat] = useState(false);
  const [playStartSound] = useSound(startSound);
  const [playEndSound] = useSound(endSound);
  const { runStateMachine } = useStateMachine();

  const onSpeakingEnd = () => {
    SpeechRecognition.startListening();
  }
  const { speak } = useSpeechSynthesis({onEnd: onSpeakingEnd});
  const { speak: speakEnd } = useSpeechSynthesis();
  const speechVoice = getVoices()[6];

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    setChatbotText("Sorry, this browser is not supported. Please use RemoteHQ on Google Chrome");
  }

  useEffect(() => {
    if (triggerVoiceChat) {
      playStartSound();
      setOpenVoiceChat(prev => !prev);
    }
  }, [triggerVoiceChat, playStartSound]);

  useEffect(() => {
    resetTranscript();
    if (openVoiceChat) {
      SpeechRecognition.startListening();
    }
  }, [openVoiceChat, resetTranscript]);

  
  // On listening stop
  useEffect(() => {
    if (!listening && transcript.length > 0) {
      runStateMachine(transcript, continueSession).then((result) => {
        if (result.continueSession) {
          setContinueSession(result.sessionId);
        } else {
          setContinueSession("");
        }
        setChatbotText(result.responseText);

        if (!result.conversationEnd) {
          speak({ text: result.responseText, voice: speechVoice });
        } else {
          speakEnd({ text: result.responseText, voice: speechVoice });
          setContinueSession("");
          setEndOfChat(true);
          setTimeout(() => {
            setOpenVoiceChat(false);
            setChatbotText("Hi, how can I help you?");
            setEndOfChat(false);
            playEndSound();
          }, 7000);
        }
        
      });
      // detectIntent(transcript, continueSession).then(({ result, sessionId }) => {
      //   setChatbotText(result.fulfillmentText);
        
      //   if (!result.allRequiredParamsPresent 
      //      || result.intent.displayName === "Default Fallback Intent"
      //      || result.intent.displayName === "Default Welcome Intent") {
          
      //     speak({ text: result.fulfillmentText, voice: voices[7] })
      //     setContinueSession(sessionId);
      //     // Will start listening from the speak end function!
      //   } else {
      //     speakEnd({ text: result.fulfillmentText, voice: voices[7] })
      //     setContinueSession("");
      //     setEndOfChat(true);
      //     setTimeout(() => {
      //       setOpenVoiceChat(false);
      //       setChatbotText("Hi, how can I help you?");
      //       setEndOfChat(false);
      //       playEndSound();
      //     }, 7000);
      //   }
      // });
    } else if (!listening && transcript.length === 0) {
      console.log("VoiceChat nothing said at all!");
      playEndSound();
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