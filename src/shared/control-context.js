

import { createContext } from "react";

// create a context with default values
const ControlContext = createContext({
  
  loginUser:   () => {},
  logoutUser:  () => {},

  user:        null,
  setUser:     ()=>{},
  teams:       [],
  currentTeam:     null,
  setCurrentTeam:  ()=>{},
  currentFolder:   null,
  setCurrentFolder:()=>{},
  currentLink:     null,
  setCurrentLink:  ()=>{},
  
  createTeam:   async ( name = "RandomTest")=>{},
  updateTeam:   async (teamId, newData={})=>{},
  deleteTeam:   async (teamId=null)=>{},
  //pinTeam:      async (teamId, newValue) => {},
  addTeamMember:async (email) => {},

  createFolder: async(name="TestName")=>{},
  updateFolder: async(folderId=null, newData={})=>{},
  deleteFolder: async( folderId=null)=>{},
  //pinFolder: async (folderId, newValue) => {},
  
  createLink:   async(linktype, name, url="")=>{},
  updateLink:   async(linkId=null, newData={})=>{},
  deleteLink:   async(linkId=null)=>{},
  //pinLink:      async (linkId=currentLink, newValue) => {},
});
  
export default ControlContext;
  


