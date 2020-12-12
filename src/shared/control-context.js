

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
  
  createTeam:   async ()=>{},
  updateTeam:   async ()=>{},
  deleteTeam:   async ()=>{},
  addTeamMember:async () => {},

  createFolder: async()=>{},
  updateFolder: async()=>{},
  deleteFolder: async()=>{},
  
  createLink:   async()=>{},
  updateLink:   async()=>{},
  deleteLink:   async()=>{},
  pinLink:      async () => {},
});
  
export default ControlContext;
  


