import { useState, useContext } from 'react';
import ControlContext from 'shared/control-context';
import { STATES, detectIntent } from 'shared/dialogflow';
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";

export const useStateMachine = () => {
  const [state, setState] = useState({name: "START"});
  const [currentIntent, setCurrentIntent] = useState({});
  const [currentParams, setCurrentParams] = useState({});
  const { 
    currentTeam,
    currentFolder,
    currentLink,
    setCurrentTeam,
    setCurrentFolder,
    setCurrentLink,
  } = useContext(ControlContext);
  const teamsRef = firebase.firestore().collection("teams");
  let history = useHistory();

  const getNewState = (intent) => {
    const currIdx = STATES[intent].findIndex((e) => e.name === state.name);
    const currStateObj = STATES[intent][currIdx];
    if (STATES[intent][currIdx].name === "END") {
      return currStateObj;
    }

    // TODO: Check if we really need to skip any steps.
    
    // let offset = 1;
    // while (true) {
    //   if (STATES[intent][currIdx + offset].name === "END") {
    //     break;
    //   }
    //   let skipVarSet = false;
    //   switch (STATES[intent][currIdx + offset].skip) {
    //     case "currentTeam":
    //       if (currentTeam) skipVarSet = true;
    //       break;
    //     case "currentFolder":
    //       if (currentFolder) skipVarSet = true;
    //       break;
    //     case "currentLink":
    //       if (currentLink) skipVarSet = true;
    //   }

    //   if (!skipVarSet) {
    //     break;
    //   }
    //   offset += 1
    // }
    return STATES[intent][currIdx + 1];
  }

  const clearStateVariables = () => {
    setState({name: "START"});
    setCurrentIntent({});
    setCurrentParams({});
  }

  const checkIfMessageIsValid = async (newMessage) => {
    let funcPromise = new Promise((resolve, reject) => {
      switch(state.skip) {
        case "currentTeam":
          // TODO: Don't use teamsRef, use usersRef and check teams
          // array for team since teamsRef has ALL teams.
          teamsRef.where("name", "==", newMessage).get().then((s) => {
            s.forEach((doc) => {
              resolve({key: "teamId", val: doc.id});
            });
            resolve("");
          });
          break;
        case "currentFolder":
          teamsRef.doc(currentTeam).collection("folders").get().then((s) => {
            s.forEach((doc) => {
              let data = doc.data();
              if (data.name === newMessage) {
                resolve({key: "folderId", val: doc.id});
              }
            });
            resolve("");
          });
          break;
        case "currentLink":
          teamsRef.doc(currentTeam).collection("folders").doc(currentFolder).get().then((s) => {
            let linksInFolder = s.data().links;

            teamsRef.doc(currentTeam).collection("links").get().then((ss) => {
              ss.forEach((doc) => {
                if (linksInFolder.includes(doc.id)) {
                  // TODO:: check file type
                  let data = doc.data();
                  if (data.name === newMessage) {
                    resolve({key: "linkId", val: doc.id})
                  }
                }
              });
              resolve("");
            });
          });
          break;
      }
    })
    return funcPromise;
  }

  const setLocation = (idToSet) => {
    switch(state.skip) {
      case "currentTeam":
        setCurrentTeam(idToSet);
        history.push("/team");
        break;
      case "currentFolder":
        setCurrentFolder(idToSet);
        history.push("/folder");
        break;
      case "currentLink":
        console.log("Setting current link to : ", idToSet);
        setCurrentLink(idToSet);
        history.push("/shared-desktop");
        break;
    }
  }
  const runStateMachine = async (newMessage, prevSessionId) => {
    let result = {
      "continueSession": false,
      "responseText": "",
    }
    if (state.name === "START") {
      let { result: resultJSON, sessionId } = await detectIntent(newMessage, prevSessionId);
      console.log("runStateMachine resultJSON", resultJSON);
      if (!resultJSON.allRequiredParamsPresent) {
        result.responseText = resultJSON.fulfillmentText;
        result.continueSession = true;
        result.sessionId = sessionId;
      } else {
        setCurrentIntent(resultJSON.intent);
        setCurrentParams(resultJSON.parameters);
        let newState = getNewState(resultJSON.intent.displayName);
        if (newState.name === "END") {
          result.responseText = newState.prompt;
          clearStateVariables();
        } else {
          setState(newState);
        }
        result.responseText = newState.prompt;
      }
    } else {
      let validKey = await checkIfMessageIsValid(newMessage);

      if (validKey !== "") {
        let newParams = {...currentParams};
        newParams.teamId = validKey.val;
        setCurrentParams({...newParams});

        setLocation(validKey.val);
        let newState = getNewState(currentIntent.displayName);
        if (newState.name === "END") {
          result.responseText = newState.prompt;
          clearStateVariables();
        } else {
          setState(newState);
        }
        result.responseText = newState.prompt;
      } else {
        result.responseText = "Sorry, I couldn't find it. Please try again.";
        clearStateVariables();
      }
    }
    return result;
  }
  return { state, runStateMachine };
}