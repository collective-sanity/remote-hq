import React, { useContext } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'
import { NavLink } from 'react-router-dom'

const getFolders = (team, teams) => {
  for (let i=0; i<teams.length; i++) {
    if (team === teams[i].name) {
      return teams[i].folders
    }
  }
}

const RoomCard = (folder) => {
  return (
    <Room>
      <NavLink 
        to={{
          pathname: '/room',
          search: `?name=${folder.folder.name}`
        }}
      >
        <RoomImage />
        <RoomName>{folder.folder.name}</RoomName>
      </NavLink>
    </Room>
  )
}

export default function Landing () {
  const { currentTeam } = useContext(ControlContext);

  // eventually have to pass selected room as a prop
  // let folders = getFolders("SSUI Final Project", teams)
  // console.log(folders)
  let folders = currentTeam.folders;

  return (
    <ContentContainer>
      <Title>SSUI Final Project Folders</Title>
      <RoomsContainer>
        {folders.map((folder, i) => <RoomCard key={i} folder={folder} />)}
      </RoomsContainer>
    </ContentContainer>
  )
}

const ContentContainer = styled.div`
  width: 100%;
  margin: 5vh 5% 0 5%;
`

const Title = styled.h1`
  font-size: 36px;
`

const RoomsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Room = styled.div`
  width: 30%;
  height: auto;
`

const RoomImage = styled.div`
  width: 100%;
  height: 250px;
  background: #C4C4C4;
  border-radius: 5px;
  margin-top: 50px;
`

const RoomName = styled.p`
  font-size: 18px;
  margin-top: 10px;
`