import React, { useContext } from "react";
import ControlContext from "shared/control-context";

const TestScreen = () => {
  const {
    user,
    rooms,
    logoutUser,
    loginUser,
    createRoom,
    deleteRoom,
  } = useContext(ControlContext);
  // Current User, Login Log out and user info
  const UserTest = () => {
    return user !== null ? 
    (
      <div id="LoginPage-container">
        <div id="LoginPage-login-button" onClick={() => logoutUser()}>
          Log Out as {user.displayName}
        </div>
      </div>
    )
    : 
    (
      <div id="LoginPage-container">
        <div id="LoginPage-login-button" onClick={() => loginUser()}>
          Login With Google
        </div>
      </div>
    );
  }

  //User Rooms, Create New and Delete
  const UserRooms = () => {
    return user === null ? 
    (<div></div>)
    :
    (  <div>  </div>);
  }
  
  //TODO Module to create, delete, and select rooms
  const ActiveRoom = ()=>{
    return rooms!==null?( <div></div>)
  :( <div></div>);
  }
  
  //TODO Module to create, delete, selectand add links to screens within a room.
  const ActiveScreen = ()=>{
    return rooms!==null?( <div></div>)
  :(<div></div>
  );}
  
  //TODO Module to create, delete, select and add links to folders within a room.
  const ActiveFolder = ()=>{
    return rooms!==null?( <div></div>)
  :( <div ></div>);
  }
  
  return  (
    <div>
      <UserTest />
      <UserRooms />
      <ActiveRoom />
    </div>
  )
};

export default TestScreen;


/*
const ActiveLink = ()=>{
return rooms!==null?( <div></div>)
:(
<div class="section container-fluid">
<div class="row">
    <div class="col-sm-6">
    <iframe  width="300" height="180" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FSLqyt8cQoYxRzY5XBoLOxN%2FSSUI-Project%3Fnode-id%3D42%253A2" allowfullscreen></iframe>
    </div>
    <div class="col-sm-6">
    <iframe  width="300" height="180" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FSLqyt8cQoYxRzY5XBoLOxN%2FSSUI-Project%3Fnode-id%3D42%253A2" allowfullscreen></iframe>
</div>
</div>
</div>
);
}

}*/