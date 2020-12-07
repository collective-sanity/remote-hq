import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import { provider, db } from 'shared/firebase';
import dummydata from 'shared/dummydata';
import firebase from "firebase/app";
import ControlContext from "shared/control-context";
import Splash from 'containers/Splash/Splash'
import Landing from 'containers/Landing/Landing'
import Room from 'containers/Room/Room'
import FolderView from 'containers/FolderView/FolderView'
import SharedDesktop from 'containers/SharedDesktop/SharedDesktop'

import './App.scss';

const LOCALMODE = false;

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

  // handy for debugging state
  useEffect(() => {
    // console.log(user);
  })

  return (
    <Router>
      <React.Fragment>
        <ControlContext.Provider
          value={{
            LOCALMODE,
            data,
            user,
            loginUser: () => {
              if (LOCALMODE) {
                setUser("uid1");
                setTeams(data["users"]["uid1"]["teams"]);
              }
              else {
                // Authenticate and get User Info
                firebase.auth().signInWithPopup(provider).then(function (result) {
                  let userRef = usersRef.doc(result.user.uid);
                  // Next . . . load user info
                  userRef.get()
                    .then(async (doc) => {
                      // Set Data
                      let data;
                      if (!doc.exists) {
                        data = {
                          "id": result.user.uid,
                          "displayName": result.user.displayName,
                          "photoUrl": result.user.photoURL,
                          "email": result.user.email,
                          "createdAt": firebase.firestore.FieldValue.serverTimestamp(),
                          "teams": [],
                        };
                        userRef.set(data);
                      } else {
                        data = { id: doc.id, ...doc.data(), }
                        setUser(doc.id);
                        setTeams(doc.teams);
                      }
                      // Add listener to keep track of changes and update state
                      userListener = userRef.onSnapshot(function (doc) {
                        console.log("Current data: ", doc.data());
                        setUser(doc.id);
                        setTeams(doc.teams);
                      });
                      // Get Rooms and set them
                      // Add room listener
                    })
                })
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
            setCurrentTeam:(teamId) =>setCurrentTeam(teamId),

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
            setCurrentFolder: folder => {
              setCurrentFolder(folder);
            },
            
            /*
            Links are all the "files" in the system, they can be organized in folders and viewed in screens
            */
            createLink: (
              name, 
              linktype, 
              url
              ) => {
                let d = {...data};
                d["teams"][currentTeam]["links"][name] = linkData;
                d["teams"][currentTeam]["folders"][currentFolder]["links"].push(name);
                setData(d);

                const linkData = {
                  "linkType": linktype,
                  "name": name,
                  "description": "",
                  "createdDate": firebase.firestore.FieldValue.serverTimestamp(),
                };
                if (linktype === "figma" || linktype === "resource") {
                  linkData.link = url;
                }
              if (LOCALMODE) {
                let d = {...data};
                d["teams"][currentTeam]["links"][name] = linkData;
                d["teams"][currentTeam]["folders"][currentFolder]["links"].push(name);
                setData(d);
              }
              else {
                if (linktype === "figma" || linktype === "resource") {
                  teamsRef.doc(currentTeam).collection("links").add(linkData).then((ref)=>{}).catch((error) => console.error("Error deleting document", error));
                  
                  teamsRef
                    .doc(currentTeam)
                    .collection("folders")
                    .doc(currentFolder)
                    .collection("links")
                    .set({
                      links: d["teams"][currentTeam]["folders"][currentFolder]["links"]
                    });
                    
                    // .add(linkData).then((ref)=>{}).catch((error) => console.error("Error deleting document", error));
                }
              }
            },
            updateLink: () => {
              if (LOCALMODE) {
                let d = {...data};
                let newName = d["teams"][currentTeam]["links"][currentLink].name;
                let newDescription = d["teams"][currentTeam]["links"][currentLink].description;
                let newLink = d["teams"][currentTeam]["links"][currentLink].link;

                var name = prompt("Please enter your name", newName);
                if (name == null || name == "") {
                  return;
                } else {
                  newName = name;
                }
                d["teams"][currentTeam]["links"][currentLink].name = newName;

                newDescription = "test";
                d["teams"][currentTeam]["links"][currentLink].description = newDescription;

                newLink = "https://www.figma.com/file/jSPgLf0DbOKa9bdztdMngs/Mobile";
                d["teams"][currentTeam]["links"][currentLink].link = newLink;

                setData(d);
              }
            },
            deleteLink: () => { 
              if (LOCALMODE) {
                let d = {...data};
                let links = d["teams"][currentTeam]["folders"][currentFolder]["links"];
                let linkIndex = links.indexOf(currentLink);
                d["teams"][currentTeam]["folders"][currentFolder]["links"].splice(linkIndex, 1);
                delete d["teams"][currentTeam]["links"][currentLink];
                setData(d);
                setCurrentLink(null);
              }
              else{
                  teamsRef.doc(currentTeam).collection("links").doc(currentLink)
                  .delete().then((ref)=>{}).catch((error) => console.error("Error deleting document", error));
              }
            },
            currentLink,
            setCurrentLink: link => {
              setCurrentLink(link);
              console.log(link);
            },
            pinLink: () => {
              if (LOCALMODE) {
                let d = {...data};
                let item = d["teams"][currentTeam]["links"][currentLink];
                if (item.pinned) {
                  item.pinned = false;
                } else {
                  item.pinned = true;
                }
                setData(d);
              }
            },
          }}>

          <div className="App__container">
            <Switch>
              <Route path="/team" component={Room}/>
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
