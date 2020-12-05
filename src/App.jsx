import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import { provider, db } from 'shared/firebase';
import dummydata from 'shared/dummydata';
import firebase from "firebase/app";
import ControlContext from "shared/control-context";
import Splash from 'containers/Splash/Splash'
import Landing from 'containers/Landing/Landing'
import LeftPanel from 'containers/Panels/LeftPanel'
import RightPanel from 'containers/Panels/RightPanel'
import Room from 'containers/Room/Room'
import FolderView from 'containers/FolderView/FolderView'
import SharedDesktop from 'containers/SharedDesktop/SharedDesktop'

import './App.scss';

const LOCALMODE = true;


const App = () => {
  const [data, setData] = useState(dummydata);
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState(null);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null);
  const teamsRef = firebase.firestore().collection("teams");
  const [currentLink, setCurrentLink] = useState(null);
  const usersRef = firebase.firestore().collection("users")
  let userListener;

  return (
    <Router>
      <React.Fragment>
        <ControlContext.Provider
          value={{
            user,
            loginUser: () => {
              if (LOCALMODE) {
                setUser(dummydata.users.uid1);
                setTeams([dummydata.teams.MHCI, dummydata.teams.Work]);
              }
              else {
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
                          "rooms": [],
                          "teams": result.user.teams,
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
                    })
                });
              }
            },
            logoutUser: () => {
              if (LOCALMODE) {
                setUser(null);
                setTeams(null);
                setCurrentTeam(null);
                setCurrentFolder(null);
              }
              else {
                firebase.auth().signOut().then(function () {
                  userListener();
                  setUser(null);
                  setTeams(null);
                  setCurrentTeam(null);
                  setCurrentFolder(null);
                }).catch(function (error) {
                  console.log(error)
                 });
              }
              // Force window refresh to display splash screen
              window.location.reload();

            },

/*

TEAMS

*/
            teams,
            currentTeam,
            createTeam: ({ 
              name = "RandomTest", 
              users = [],

            })=>{
              const teamData = {
                "name": name,
                "host": user.id,
                "users": [user.id, ...users],
                "folders": [],
                "links": [],
                "screens": [],
                "createdAt": firebase.firestore.FieldValue.serverTimestamp(),
              };
              if (LOCALMODE) {
                let d = {...data};
                d[name]=teamData;
              }
              else{
                  
                  // Add Room
                  teamsRef.add(teamData).then((ref) => {
                    // Update User -- TODO update all users
                    usersRef.doc(user.id).update({
                      teams: [...user.teams, ref.id]
                    });
                    console.log("Added doc with ID: ", ref.id);
                  });
                  setCurrentTeam(teamData);
              }
            },
            updateTeam:({
              teamId=currentTeam.id,
              newData})=>{
              if (LOCALMODE) {
                let d = {...data};
                d[teamId]=newData;
                setData(d);
              }
              else{
                teamsRef.doc(teamId).update(newData).then((ref)=>{ }).catch((error) => console.error("Error updating document", error));
              }
            },
            deleteTeam:({
              teamId=currentTeam.id
            })=>{
              if (LOCALMODE) {
                let d = {...data};
                delete d[teamId];
                setData(d);
              }
              else{
                  teamsRef.doc(teamId).delete().then((ref)=>{
                    usersRef.doc(user.id).update({
                      teams: user.teams.filter(t=>t!==ref.id)
                    });
                }).catch((error) => console.error("Error deleting document", error));
              }
            },
            setCurrentTeam:({teamId}) =>setCurrentTeam(teamId),

            /*

            FOLDERS

            */
            createFolder: ({name="TestName"}) => { 

            },
            updateFolder: ({
              teamId=currentTeam.id, 
              folderId=currentFolder.id, 
              newData})=> {
              if (LOCALMODE) {
                let d = {...data};
                d[teamId][folderId]=newData;
                setData(d);
              }
              else{
                teamsRef.doc(teamId).update({
                  "folders":newData
                }).then((ref)=>{ }).catch((error) => console.error("Error updating document", error));
              }
            },
            deleteFolder: ({
              teamId=currentTeam.id
            }) => {
              if (LOCALMODE) {
                let d = {...data};
                delete d[teamId];
                setData(d);
              }
              else{
                  teamsRef.doc(teamId).delete().then((ref)=>{
                    usersRef.doc(user.id).update({
                      teams: user.teams.filter(t=>t!==ref.id)
                    });
                }).catch((error) => console.error("Error deleting document", error));
              }
            },
            currentFolder,
            setCurrentFolder,
            
            /*
            Links are all the "files" in the system, they can be organized in folders and viewed in screens
            */
            createLink: ({ 
              name, 
              linktype, 
              url, 
              folderId=currentFolder.id, 
              teamId=currentTeam.id }) => {
                const linkData = {
                  "linkType": linktype,
                  "isPinned": true,
                  "name":name,
                  "description": "",
                  "createdDate": "2020-011-03T07:22Z",
                  "lastModifiedDate": "2020-11-19T07:22Z",
                  "link": url
                };
              if (LOCALMODE) {
                let d = {...data};
                d[teamId]["links"][name]=linkData;
                d[teamId]["folders"][folderId]["links"].push(name);
                setData(d);
              }
              else{

                  teamsRef.doc(teamId).collection("links").add(linkData).then((ref)=>{}).catch((error) => console.error("Error deleting document", error));
              }
            },
            deleteLink: ({teamId=currentTeam.id, linkId}) => { 
              if (LOCALMODE) {
                let d = {...data};
                delete d[teamId]["links"][linkId];
                setData(d);
              }
              else{
                  teamsRef.doc(teamId).collection("links").doc(linkId)
                  .delete().then((ref)=>{}).catch((error) => console.error("Error deleting document", error));
              }
            },
            currentLink,
            setCurrentLink: link => {
              setCurrentLink(link);
            },
            updateLink: () => {},
            pinLink: () => {},
          }}>

          <div className="App__container">
            <Switch>
              <Route path="/room" component={Room}/>
              <Route path="/folder" component={FolderView}/>
              <Route path="/shared-desktop" component={SharedDesktop} />
              <Route exact path="/">
                {/*Conditional rendering based on whether user logged in*/}
                {user ? <Landing /> : <Splash />}
              </Route>
            </Switch>
          </div>
        </ControlContext.Provider>
      </React.Fragment>
    </Router>
  );
}

export default App;
