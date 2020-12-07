import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'
import { NavLink } from 'react-router-dom'
import firebase from 'firebase/app'
import { useCollection, useCollectionData, useDocument } from 'react-firebase-hooks/firestore';

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

const FirebaseRoomCard = ({ teamId, setCurrentTeam }) => {
  console.log(teamId)
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`teams/${teamId}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <Room>
      <NavLink 
        to={{
          pathname: '/team',
        }}
        onClick={() => setCurrentTeam(teamId)}
      >
        <RoomImage />
        <RoomName>{value && value.data().name}</RoomName>
      </NavLink>
    </Room>
  )
}



export default function Landing () {
  const { LOCALMODE, data, user, setCurrentTeam } = useContext(ControlContext);
  const [teamsList, setTeamsList] = useState(null);

  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`users/${user}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  if (LOCALMODE) {
    setTeamsList(data["users"][user]["teams"]);
  }
  

  return (
    <ContentContainer>
      <Title>Teams</Title>
      {LOCALMODE ? (
        <RoomsContainer>
          {teamsList.map((teamId, i) => <RoomCard key={i} data={data} teamId={teamId} setCurrentTeam={setCurrentTeam} />)}
        </RoomsContainer>
      ) : (
        <RoomsContainer>
          {value && value.data().teams.map((teamId, i) => <FirebaseRoomCard key={i} teamId={teamId} setCurrentTeam={setCurrentTeam} />)}
        </RoomsContainer>
      )}
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