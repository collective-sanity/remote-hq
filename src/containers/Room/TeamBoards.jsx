import React, { useContext } from "react"
import styled from "styled-components"
import { Link } from 'react-router-dom'
import ControlContext from '../../shared/control-context'
import firebase from 'firebase/app'
import { useCollection } from 'react-firebase-hooks/firestore';
import Trashcan from 'assets/Landing/delete.svg'
import { OverlayContainer } from 'assets/StyledComponents/Overlay'

export default function TeamBoards () {
  const context = useContext(ControlContext);
  let { LOCALMODE, data, currentTeam, setCurrentFolder, deleteFolder } = context;
  // console.log(currentTeam)

  const [value] = useCollection(
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
                <OverlayContainer>
                  <TrashIcon onClick={() => deleteFolder(folder.id)} src={Trashcan} />
                  <FirebaseBoardLink id={folder.id} folder={folder.data()} setCurrentFolder={setCurrentFolder} deleteFolder={deleteFolder} />
                </OverlayContainer>
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

const FirebaseBoardLink = ({ id, folder, setCurrentFolder, deleteFolder }) => {
  return (
    <NavLink 
      to='/folder'
      onClick={() => setCurrentFolder(id)}
    >
      <FolderName>{folder.name}</FolderName>
      <LinkContainer>
        {/* Only get first 6 files */}
        {folder.links.slice(0, 8).map((i) => <LinkBox key={i}></LinkBox>)}
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
  width: 21%;
  background-color: #c4c4c4;
  margin-bottom: 20px;
`

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const TrashIcon = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  height: 30px;
  width: 30px;
`
