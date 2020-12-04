import { createContext } from "react";

// create a context with default values
const ControlContext = createContext({
  user: null,
  loginUser: () => {},
  logoutUser: () => {},
  rooms:[],
  teams:[],
  createRoom:()=>{},
  deleteRoom:()=>{},
  currentRoom:null,
  setCurrentRoom:()=>{},
    currentScreen:null,
    setCurrentScreen:()=>{},
    currentFolder:null,
    setCurrentFolder:()=>{},
    createFolder:()=>{},
    deleteFolder:()=>{},
    createLink:()=>{},
    deleteLink:()=>{},
    addLink:()=>{}
});
  
export default ControlContext;
  
// export default function CartProvider({ children }) {
//   const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart'))??[]);
//   const [user, setUser] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [currentItem, setcurrentItem] = useState(null);

  
//   return (
//   <CartContext.Provider value={{ cart, setCart, user, setUser, loading, setLoading,currentItem, setcurrentItem}}>
//     {children}
//   </CartContext.Provider>);
// }


/*
changeCurrBorderColor: () => {},
    currBorderWidth: 1,
    changeCurrBorderWidth: (w) => {},
    currFillColor: "",
    changeCurrFillColor: () => {},
    shapes: [],
    shapesMap: {},
    selectedShapeId: "", // a string or undefined
    selectShape: () => {},
    addShape:(e) =>{},
    moveShape:(e) =>{},
    //abortCommand:()=>{},
    handleKeyEvent:()=>{},
    // handling undo/redo
    commands: [],
    commandsMap: {},
    selectedCommandId: null,
    tempCommand: null, // For events that happen over period of time, current command stores temp vals
    currentCommand:null,
    //currentNode:null,
    canUndo: () => false,
    canRedo: () => false,
    canRepeat:()=>false,
    undo: () => {},
    redo: () => {},
    repeat: ()=>{},
*/