import React, { useEffect, useState} from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useHistory } from "react-router-dom"
import { 
  provider, 
  getUserRef,
  getUserData, 
  setUserData, 
  updateUserData, 
  getUsers,
  createNewUser,

  getTeamUsers, 
  updateTeam,
  deleteTeam,
  
  getLinkData,
  createLink,
  updateLink,
  deleteLink,

  createFolder,
  updateFolder,
  deleteFolder,
  createTeam,
  getTeamData,
  
 } from 'shared/firebase';
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
import { addLinkSnippet } from "react-chat-widget";

const randomPhotos = [
  "https://images.unsplash.com/photo-1607453813894-21f7b5cf201a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",

]
const LOCALMODE = false;

const App = () => {
//  const [data, setData] = useState(dummydata);
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState(null);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [currentLink, setCurrentLink] = useState(null);
  
  const history = useHistory();

  
  let userListener;

  // window.addEventListener("load", ()=>{
  //   // let _user = localStorage.getItem('user'),
  //   //     _teams = localStorage.getItem('teams'),
  //   //     _currentTeam = localStorage.getItem('currentTeam'),
  //   //     _currentFolder = localStorage.getItem('currentFolder'),
  //   //     _currentLink = localStorage.getItem('currentLink');
  //   //     console.log(currentTeam);
  //   //     console.log(_currentTeam);
  //   //   if(_user!==null && user===null){ setUser(_user);}
  //   //   if(_teams!==null && teams===null)  setTeams(_teams);
  //   //   if(_currentTeam!==null && currentTeam===null) setCurrentTeam(_currentTeam);
  //   //   if(_currentFolder!==null && currentFolder===null)  setCurrentFolder(_currentFolder);
  //   //   if(_currentLink!==null && currentLink===null)    setCurrentLink(_currentLink);
  //   //   console.log(currentTeam);
  // },true);

  // handy for debugging state
  useEffect(() => {})
 
  return (
    <Router>
      <React.Fragment>
        <ControlContext.Provider
          value={{
            user, // ID of current user
            teams, // ids of user's teams
            currentTeam, // id selected team
            setCurrentTeam:(teamId) => {setCurrentTeam(teamId);window.localStorage.setItem("currentTeam",teamId);},
            currentFolder,
            setCurrentFolder: folderId => {setCurrentFolder(folderId);window.localStorage.setItem("currentFolder",folderId); },
            currentLink,
            setCurrentLink: linkId => { setCurrentLink(linkId);window.localStorage.setItem("currentLink",linkId); },
            
            loginUser: async () => {
                // Authenticate and get User Info
                let result = await firebase.auth().signInWithPopup(provider);
                let userId = result.user.uid;
                let userData = await getUserData(userId);
                let data;
                if (!userData) data = await createNewUser(result);
                else  data = { id: userId, ...userData, }
                setUser(userId);window.localStorage.setItem("user", userId);
                setTeams(userData.teams);window.localStorage.setItem("teams", userData.teams);
            },
            logoutUser: () => {
                firebase.auth().signOut().then(function () {
                  //userListener();
                  setUser(null);window.localStorage.setItem("user", null);
                  setTeams(null); window.localStorage.setItem("teams", null);
                  setCurrentTeam(null);window.localStorage.setItem("currentTeam", null);
                  setCurrentFolder(null);window.localStorage.setItem("currentFolder", null);
                  history.push("/");
                }).catch(function (error) {console.log(error) });
              // window.location.reload();
            },

           
            createTeam: async (  name = "RandomTest" )=>{
              let res = await createTeam(name, user);
              setCurrentTeam(res.id);
              window.localStorage.setItem("currentTeam", res.id);
            },
            updateTeam:({
              teamId=currentTeam,
              newData})=>{
                updateTeam(teamId, )
             
                //eamsRef.doc(teamId).update(newData).then((ref)=>{ }).catch((error) => console.error("Error updating document", error));
              
            },
            addTeamMember: async (email) => {
              console.log(email)
              const usersRef = firebase.firestore().collection('users');
              const snapshot = await usersRef.where('email', '==', email).get();
              if (snapshot.empty) {
                console.log('No matching documents.');
                return;
              }
              let team = await getTeamData(currentTeam);
              snapshot.forEach(doc => {
                updateTeam(currentTeam,{
                  users: [...team.users, {"id": doc.id, "email":doc.data().email}] // need to spread current users
                 });
              });
            },
            deleteTeam:async(
              teamId = currentTeam
            ) => {
               await deleteTeam(teamId, user);
               setCurrentTeam(null)
               window.localStorage.setItem("currentTeam", null);
              },
           
            /*

            FOLDERS

            */
            createFolder: async (name="TestName") => { 
               let res = await createFolder(currentTeam, name, links);
              setCurrentFolder(res.id);
              window.localStorage.setItem("currentFolder", res.id);
            },
            updateFolder: ({
              teamId=currentTeam.id, 
              folderId=currentFolder.id, 
              newData})=> {updateFolder(teamId,folderId, { "folders":newData}) },
           
            deleteFolder: async ( folderId) => {
              
                deleteFolder( currentTeam , folderId);
                setCurrentFolder(null);
                window.localStorage.setItem("currentFolder", null);
                
            },
            /*
            Links are all the "files" in the system, they can be organized in folders and viewed in screens
            */
            createLink: async linktype => {
                let name = prompt("Please enter a name", '');
                if (name === null || name === "") { return; }
                let url="";
                if (linktype === "figma" || linktype === "resource") {
                  url = prompt("Please enter a URL", '');
                  if (url === null || url === "") {
                    return;
                  }
                }
               await createLink(currentTeam, currentFolder, linktype, name, url=url);
            },
            updateLink:async  () => {
                  let newName;
                  let name = prompt("Please enter a new name", '');
                  if (name === null || name === "") {return;
                  } else { newName = name;}
                  updateLink(currentTeam,currentLink, {name: newName})
            },
            deleteLink:async () => { 
                await deleteLink(currentTeam,);
                
            },
            pinLink: async () => {
               let item = await getLinkData(currentTeam,currentLink);
               await updateTeam(currentTeam, {pinned: !item.pinned});
            },
          
          }}>
          <div className="App__container">
            {user ? <><VoiceChat /><Chat /></> : <></> }
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





                      /*
                      let folder = await getFolder(currentTeam, currentFolder);
                let links = folder.data().links;
                let index = links.indexOf(currentLink);
                links.splice(index, 1);
                await updateFolder(currentTeam, currentFolder,{ links: links} )
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



                //   teamsRef.doc(teamId).delete().then((ref)=>{
                //     usersRef.doc(user).update({
                //       teams: teams.filter(team => team !== teamId)
                //     });
                //     console.log("Deleted team with ID: ", currentTeam);
                //     setCurrentTeam(null)
                // }).catch((error) => console.error("Error deleting document", error));