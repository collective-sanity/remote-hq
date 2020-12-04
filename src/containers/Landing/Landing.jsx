import React, { useContext } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'
import { NavLink } from 'react-router-dom'

const getRooms = (team, teams) => {
  for (let i=0; i<teams.length; i++) {
    if (team === teams[i].id) {
      return teams[i].rooms
    }
  }
}

const RoomCard = (room) => {
  return (
    <Room>
      <NavLink 
        to={{
          pathname: '/room',
          search: `?name=${room.room.name}`
        }}
      >
        <RoomImage />
        <RoomName>{room.room.name}</RoomName>
      </NavLink>
    </Room>
  )
}

export default function Landing () {
  const { teams } = useContext(ControlContext);

  // eventually have to pass selected room as a prop
  let rooms = getRooms("MHCI", teams)

  return (
    <ContentContainer>
      <Title>MHCI Rooms</Title>
      <RoomsContainer>
        {Object.keys(rooms).map((room, i) => <RoomCard key={i} room={rooms[room]} />)}
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