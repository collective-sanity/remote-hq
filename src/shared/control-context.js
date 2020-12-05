import { createContext } from "react";

// create a context with default values
const ControlContext = createContext({
  user: null,
  loginUser: () => {},
  logoutUser: () => {},
  teams:[],
  currentTeam:null,
  createTeam:()=>{},
  updateTeam:()=>{},
  deleteTeam:()=>{},
  setCurrentTeam:()=>{},
    
    currentFolder:null,
    setCurrentFolder:()=>{},
    createFolder:()=>{},
    updateFolder:()=>{},
    deleteFolder:()=>{},
    
    
    createLink:()=>{},
    deleteLink:()=>{},
});
  
export default ControlContext;
  