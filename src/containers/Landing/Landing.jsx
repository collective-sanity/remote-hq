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

const RoomCard = ({ teamId, data, setCurrentTeam }) => {
  let name = data["teams"][teamId].name;

  return (
    <Room>
      <NavLink 
        to={{
          pathname: '/team',
          search: `?name=${name}`
        }}
        onClick={() => setCurrentTeam(teamId)}
      >
        <RoomImage />
        <RoomName>{name}</RoomName>
      </NavLink>
    </Room>
  )
}

export default function Landing () {
  const { data, user, setCurrentTeam } = useContext(ControlContext);

  // eventually have to pass selected room as a prop
  let teamsList = data["users"][user]["teams"];
  console.log(teamsList)

  return (
    <ContentContainer>
      <Title>Teams</Title>
      <RoomsContainer>
        {teamsList.map((teamId, i) => <RoomCard key={i} data={data} teamId={teamId} setCurrentTeam={setCurrentTeam} />)}
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