import React, { useContext } from "react"
import styled from "styled-components"
import { Link } from 'react-router-dom'
import ControlContext from '../../shared/control-context'
import firebase from 'firebase/app'
import { useCollection } from 'react-firebase-hooks/firestore';

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
          <Board key={i}>
            <BoardLink folder={folder} data={data} setCurrentFolder={setCurrentFolder} currentTeam={currentTeam} />
          </Board>
        )}
      </BoardContainer>
      ) : (
      <BoardContainer>
          {value && value.docs.map((folder, i) => (
            <Board key={i}>
              <FirebaseBoardLink id={folder.id} folder={folder.data()} setCurrentFolder={setCurrentFolder} currentTeam={currentTeam} />
            </Board>
          ))}
      </BoardContainer>
      )}
    </TeamContainer>
  )
}

const BoardLink = ({ folder, data, currentTeam, setCurrentFolder }) => {
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
      <FolderName>{folder.name}</FolderName>
      <LinkContainer>
        {folder.links.map((i) => <LinkBox key={i}></LinkBox>)}
      </LinkContainer>
    </NavLink>
  )
}

const FolderName = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
`

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
  width: 47%;
  height: auto;
  background: #F0F0F0;
  border-radius: 5px;
  margin-top: 30px;
  padding: 30px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
`

const LinkBox = styled.div`
  height: 120px;
  width: 30%;
  background-color: #c4c4c4;
  margin-bottom: 20px;
`

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`