import React, { useContext } from "react"
import styled from "styled-components"
import { Link } from 'react-router-dom'
import ControlContext from '../../shared/control-context'
import firebase from 'firebase/app'
import { useCollection, useCollectionData, useDocument } from 'react-firebase-hooks/firestore';

export default function TeamBoards () {
  const context = useContext(ControlContext);
  let { LOCALMODE, data, currentTeam, setCurrentFolder } = context;
  // console.log(currentTeam)

  const [value, loading, error] = useCollection(
    firebase.firestore().collection("teams").doc(currentTeam.trim()).collection("folders"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  let folders;
  if (LOCALMODE) {
    let foldersObj = data["teams"][currentTeam]["folders"];
    folders = Object.keys(foldersObj);
  }

  return (
    <TeamContainer>
      <Title>Team Folders</Title>
      {LOCALMODE ? (
        <BoardContainer>
        {folders.map((folder, i) => 
          <Board>
            <BoardLink key={i} folder={folder} data={data} setCurrentFolder={setCurrentFolder} currentTeam={currentTeam} />
          </Board>
        )}
      </BoardContainer>
      ) : (
        <BoardContainer>
          {value && value.docs.map((folder, i) => (
            <Board>
              <FirebaseBoardLink key={i} id={folder.id} folder={folder.data()} setCurrentFolder={setCurrentFolder} currentTeam={currentTeam} />
            </Board>
          ))}
      </BoardContainer>
      )}
    </TeamContainer>
  )
}

const BoardLink = ({ folder, data, currentTeam, setCurrentFolder }) => {
  console.log(folder)
  let name = data["teams"][currentTeam]["folders"][folder].name;

  return (
    <NavLink 
      to='/folder'
      onClick={() => setCurrentFolder(folder)}
    >
      {name}
    </NavLink>
  )
}

const FirebaseBoardLink = ({ id, folder, currentTeam, setCurrentFolder }) => {
  // console.log(folder)
  // let name = data["teams"][currentTeam]["folders"][folder].name;
  // const [value, loading, error] = useDocument(
  //   firebase.firestore().collection("teams").doc(currentTeam).collection("folders").doc(folder),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // );

  return (
    <NavLink 
      to='/folder'
      onClick={() => setCurrentFolder(id)}
    >
      {folder.name}
    </NavLink>
  )
}

const TeamContainer = styled.div`
  margin-top: 50px;
`

const BoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.h1`
  font-size: 36px;
`

const NavLink = styled(Link)`
  width: 46%;
  height: 375px;
` 

const Board = styled.div`
  width: 100%;
  height: 100%;
  background: #F0F0F0;
  border-radius: 5px;
  margin-top: 30px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
`