import React, { useEffect, useState } from "react";
// import { useKeyPress } from 'hooks/useKeyPress';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import { provider, getUserData } from 'shared/firebase';
import dummydata from 'shared/dummydata';
import firebase from "firebase/app";
import ControlContext from "shared/control-context";
import Splash from 'containers/Splash/Splash'
import Landing from 'containers/Landing/Landing'
import Room from 'containers/Room/Room'
import FolderView from 'containers/FolderView/FolderView'
import SharedDesktop from 'containers/SharedDesktop/SharedDesktop'
import Chat from 'components/Chat/Chat'

import './App.scss';
import VoiceChat from "components/VoiceChat/VoiceChat";

const LOCALMODE = false;

const App = () => {
  const [data, setData] = useState(dummydata);
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState(null);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null);
  const teamsRef = firebase.firestore().collection("teams");
  const [currentLink, setCurrentLink] = useState(null);
  const usersRef = firebase.firestore().collection("users");
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
                        setTeams(doc.data().teams);
                      }
                      // Add listener to keep track of changes and update state
                      userListener = userRef.onSnapshot(function (doc) {
                        console.log("Current data: ", doc.data());
                          
                        setUser(doc.id);
                        setTeams(doc.data().teams);
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
            createTeam: ( 
              name = "RandomTest"
            )=>{
              const teamData = {
                "name": name,
                "host": user,
                "users": [{id: user}],
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
                // Add team
                teamsRef.add(teamData).then((ref) => {
                  // Update User -- TODO update all users
                  usersRef.doc(user).update({
                    teams: [...teams, ref.id]
                  });
                  console.log("Added team with ID: ", ref.id);
                  setCurrentTeam(ref.id);
                });
              }
            },
            updateTeam:({
              teamId=currentTeam,
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
            deleteTeam:(
              teamId=currentTeam
            ) => {
              if (LOCALMODE) {
                let d = {...data};
                delete d[teamId];
                setData(d);
              }
              else{
                  teamsRef.doc(teamId).delete().then((ref)=>{
                    usersRef.doc(user).update({
                      teams: teams.filter(teamId => teamId !== currentTeam)
                    });
                    console.log("Deleted team with ID: ", currentTeam);
                    setCurrentTeam(null)
                }).catch((error) => console.error("Error deleting document", error));
              }
            },
            setCurrentTeam:(teamId) => setCurrentTeam(teamId),
            /*

            FOLDERS

            */
            createFolder: (name="TestName") => { 
              const folderData = {"name": name, "links": []};
              const folderRef = teamsRef.doc(currentTeam).collection("folders");

              folderRef.add(folderData).then((ref) => {
                console.log("Added folder with ID: ", ref.id);
                setCurrentFolder(ref.id);
              });
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
            deleteFolder: (
              teamId = currentTeam
            ) => {
              if (LOCALMODE) {
                let d = {...data};
                delete d[teamId];
                setData(d);
              }
              else {
                const folderRef = teamsRef.doc(currentTeam).collection("folders");
                folderRef.doc(currentFolder).delete().then((ref)=>{
                  // What should we do about links in a delete folder?
                  console.log("Deleted folder with ID: ", currentFolder);
                  setCurrentFolder(null)
                }).catch((error) => console.error("Error folder document", error));
              }
            },
            currentFolder,
            setCurrentFolder: folder => {
              setCurrentFolder(folder);
            },
            
            /*
            Links are all the "files" in the system, they can be organized in folders and viewed in screens
            */
            createLink: linktype => {
                let name = prompt("Please enter a name", '');
                if (name === null || name === "") {
                  return;
                }

                let url;
                if (linktype === "figma" || linktype === "resource") {
                  url = prompt("Please enter a URL", '');
                  if (url === null || url === "") {
                    return;
                  }
                }

                const linkData = {
                  "linkType": linktype,
                  "name": name,
                  "pinned": false,
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
                if (linktype === "figma" || linktype === "resource" || linktype.includes("google")) {
                  let folderRef = teamsRef.doc(currentTeam).collection("folders").doc(currentFolder);
              
                  teamsRef
                    .doc(currentTeam)
                    .collection("links")
                    .add(linkData)
                    .then((result)=>{
                      // link data added
                      console.log(result)
                      let linkID = result.id;
                      folderRef.get().then((val)=>{
                        let folderData = val.data();
                        console.log(folderData)
                        folderRef.update({
                          "links":[ ...folderData.links, linkID]
                        });
                      });
                      /*
                      if(linktype === "figma" || linktype === "resource"){
                        setCurrentLink(linkData);
                      }
                      else if(linktype.includes("google")){
                        //let linkListener = 
                        teamsRef
                        .doc( currentTeam).collection("links").doc(linkID).onSnapshot(function (doc) {
                          console.log("Current data: ", doc.data());
                          let newData = doc.data();
                        if(newData.url!==null && newData !==""){
                              setCurrentLink(doc.id);
                              linkListener();
                         }

                        });
                      }*/
                    }).catch((error) => console.error("Error adding document", error));
             
                }
              }
            },
            updateLink: () => {
              if (LOCALMODE) {
                let d = {...data};
                let newName = d["teams"][currentTeam]["links"][currentLink].name;
                let newDescription = d["teams"][currentTeam]["links"][currentLink].description;
                let newLink = d["teams"][currentTeam]["links"][currentLink].link;

                let name = prompt("Please enter a new name", newName);
                if (name === null || name === "") {
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
              } else {
                  let newName;
                  let name = prompt("Please enter a new name", '');
                  if (name === null || name === "") {
                    return;
                  } else {
                    newName = name;
                  }

                  teamsRef
                    .doc(currentTeam)
                    .collection("links")
                    .doc(currentLink)
                    .update({
                      name: newName
                    })
                    .then(() => {
                      console.log("Document successfully updated!")
                    })
                    .catch(function(error) {
                      console.error("Error updating document: ", error);
                    });
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
              else {
                  teamsRef
                    .doc(currentTeam)
                    .collection("links")
                    .doc(currentLink)
                    .delete()
                    .then(
                      teamsRef
                        .doc(currentTeam)
                        .collection("folders")
                        .doc(currentFolder)
                        .get()
                        .then((doc) => {
                          let links = doc.data().links;
                          let index = links.indexOf(currentLink);
                          links.splice(index, 1);

                          teamsRef
                            .doc(currentTeam)
                            .collection("folders")
                            .doc(currentFolder)
                            .update({
                              links: links
                            })
                        })
                    )
                    .catch((error) => console.error("Error deleting document", error));
                    setCurrentLink(null);
              }
            },
            currentLink,
            setCurrentLink: link => {
              setCurrentLink(link);
            },
            pinLink: async () => {
              if (LOCALMODE) {
                let d = {...data};
                let item = d["teams"][currentTeam]["links"][currentLink];
                if (item.pinned) {
                  item.pinned = false;
                } else {
                  item.pinned = true;
                }
                setData(d);
              } else {
                  let item = await teamsRef
                    .doc(currentTeam)
                    .collection("links")
                    .doc(currentLink)
                    .get()
                    .then((doc) => {
                      return doc.data()
                    });

                  if (item.pinned) {
                    teamsRef
                    .doc(currentTeam)
                    .collection("links")
                    .doc(currentLink)
                    .update({
                      pinned: false
                    })
                  } else {
                    teamsRef
                    .doc(currentTeam)
                    .collection("links")
                    .doc(currentLink)
                    .update({
                      pinned: true
                    })
                  }
              }
            },
          }}>
          <div className="App__container">
            {user ? 
              <>
                <VoiceChat />
                <Chat />
              </>
            :
              <></>
            }
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


                  
                  // teamsRef.doc(currentTeam).collection("links")

                  // teamsRef
                  //   .doc(currentTeam)
                  //   .collection("folders")
                  //   .doc(currentFolder)
                  //   .collection("links")
                  //   .set({
                  //     links: d["teams"][currentTeam]["folders"][currentFolder]["links"]
                  //   });
                    
                    // .add(linkData).then((ref)=>{}).catch((error) => console.error("Error deleting document", error));