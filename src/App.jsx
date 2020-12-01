import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route,} from "react-router-dom";

import { provider, db } from 'shared/firebase';
import firebase from "firebase/app";
import ControlContext from "shared/control-context";
import TestScreen from 'containers/TestScreen/TestScreen';
import Splash from 'containers/Splash/Splash'

import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentScreen, setCurrentScreen] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null);

  const roomsRef = firebase.firestore().collection("rooms");
  const usersRef = firebase.firestore().collection("users")
  let userListener;

  return (
    <Router>
      <React.Fragment>
        <ControlContext.Provider
          value={{
            /*
            USER Functions
            loginUser - 
            logoutUser - 
            */
            user,
            loginUser: () => {
              console.log('hello')
              // Authenticate and get User Info
              firebase.auth().signInWithPopup(provider).then(function (result) {
                let userRef = usersRef.doc(result.user.uid);
                // Next . . . load user info
                userRef.get()
                  .then((doc) => {
                    // Set Data
                    let data;
                    if (!doc.exists) {
                      data = {
                        "id": result.user.uid,
                        "displayName": result.user.displayName,
                        "photoUrl": result.user.photoURL,
                        "email": result.user.email,
                        "createdAt": firebase.firestore.FieldValue.serverTimestamp(),
                        "rooms": []
                      };
                      userRef.set(data);
                    } else {
                      data = { id: doc.id, ...doc.data(), }
                    }
                    // Add listener to keep track of changes and update state
                    userListener = userRef.onSnapshot(function (doc) {
                      console.log("Current data: ", doc.data());
                      setUser(data);
                    });
                    // Get Rooms and set them
                    // Add room listener
                  });
              });
            },
            logoutUser: () => {
              firebase.auth().signOut().then(function () {
                userListener();
                setUser(null);
                setRooms(null);
                setCurrentRoom(null);
                setCurrentScreen(null);
                setCurrentFolder(null);
              }).catch(function (error) { });
            },

            /*
            ROOM Functions
            createRoom -
            deleteRoom -
            setCurrentRoom -  
            */
            rooms,
            createRoom: ({name="RandomTest", users = []}) => {
              const roomData = {
                "name": name,
                "host": user.id,
                "users": [user.id, ...users],
                "folders": [],
                "links": [],
                "screens": [],
                "createdAt": firebase.firestore.FieldValue.serverTimestamp(),
              };
              // Add Room
              roomsRef.add(roomData).then((ref) => {
                // Update User -- TODO update all users
                usersRef.doc(user.id).update({
                  rooms: [...user.rooms, ref.id]
                });
                console.log("Added doc with ID: ", ref.id);
              });
            },
            deleteRoom: (roomID) => {
              roomsRef
                .doc(roomID)
                .delete()
                .then(() => {
                  usersRef.doc(user.id).update({
                    roooms: user.rooms.filter(roomid => roomid !== roomID)
                  });
                }) // Document deleted
                .catch((error) => console.error("Error deleting document", error));
            },
            currentRoom,
            setCurrentRoom: (room) => {
              setCurrentRoom(room);
            },

              /*
            FOLDER Functions
            setCurrentFolder - 
            Create -
            Delete -
            */
            currentFolder,
            setCurrentFolder: (folder, { share = false }) => {
              setCurrentFolder(folder);
              if (share) {
                roomsRef.get(currentRoom.id)
              }
            },
            createFolder: () => { },
            deleteFolder: () => { },
            
            /*
            The screens are where you actually view the links and collaborate with others
            setCurrentScreen
            */
            currentScreen,
            setCurrentScreen: () => {

            },
            createScreen: () => {

            },
            updateScreen: () => {

            },

            /*
            Links are all the "files" in the system, they can be organized in folders and viewed in screens
            */
            createLink: ({name, linktype}) => {
              if(linktype==="googleDoc"){ }
              else if(linktype==="figma"){}
              },
              addLink: ({name, linktype, url})=>{},
              deleteLink: () => {},
          }}>

          <div className="App__container">
            {/*Didn't actually set up routing yet*/}
            <Switch>
              <Route path="/about">
                <TestScreen />
              </Route>
              <Route path="/users">
                <TestScreen />
              </Route>
              <Route path="/">
                <Splash />
              </Route>
            </Switch>
          </div>
         </ControlContext.Provider>
      </React.Fragment>
    </Router>
  );
}

export default App;
