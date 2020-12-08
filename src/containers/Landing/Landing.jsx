import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'
import { NavLink } from 'react-router-dom'
import firebase from 'firebase/app'
import { useCollection, useCollectionData, useDocument } from 'react-firebase-hooks/firestore';
import ReactModal from 'react-modal'

import LeftPanel from "containers/Panels/LeftPanel";
import RightPanel from "containers/Panels/RightPanel";

const TeamCard = ({ teamId, data, setCurrentTeam }) => {
  let name = data["teams"][teamId].name;

  return (
    <Team>
      <NavLink 
        to={{
          pathname: '/team',
          search: `?name=${name}`
        }}
        onClick={() => setCurrentTeam(teamId)}
      >
        <TeamImage />
        <TeamName>{name}</TeamName>
      </NavLink>
    </Team>
  )
}

const FirebaseTeamCard = ({ teamId, setCurrentTeam }) => {
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`teams/${teamId.trim()}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <Team>
      <NavLink 
        to='/team'
        onClick={() => setCurrentTeam(teamId)}
      >
        <TeamImage />
        <TeamName>{value && value.data() && value.data().name}</TeamName>
      </NavLink>
    </Team>
  )
}

const ModalContent = ({ setModalOpen }) => {
  const { createTeam } = useContext(ControlContext)
  const [name, setName] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    createTeam(name)
    setModalOpen(false)
  }
  
  return (
    <div>
      <p onClick={() => setModalOpen(false)}>X</p>
      <p>Modal Content</p>
      <form onSubmit={handleSubmit} >
        <label>
          New Team Name:
          <input 
            type="text" 
            name="name" 
            onChange={event => setName(event.target.value)} 
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}


export default function Landing () {
  const { LOCALMODE, data, user, setCurrentTeam } = useContext(ControlContext);
  const [modalOpen, setModalOpen] = useState(false)
  // const [teamsList, setTeamsList] = useState(null);

  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`users/${user}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  let teamsList;
  if (LOCALMODE) {
    teamsList = data["users"][user]["teams"];
  }

  return (
    <Row>
      <LeftPanel />
      <ContentContainer>
        <Title>Teams</Title>
        {LOCALMODE ? (
          <TeamsContainer>
            {teamsList.map((teamId, i) => <TeamCard key={i} data={data} teamId={teamId} setCurrentTeam={setCurrentTeam} />)}
          </TeamsContainer>
        ) : (
          <TeamsContainer>
            {value && value.data().teams.map((teamId, i) => <FirebaseTeamCard key={i} teamId={teamId} setCurrentTeam={setCurrentTeam} />)}
          </TeamsContainer>
        )}
        <ReactModal isOpen={modalOpen} >
          <ModalContent setModalOpen={setModalOpen} />
        </ReactModal>
      </ContentContainer>
      <RightPanel page="Landing" setModalOpen={setModalOpen} />
    </Row>
  )
}

const Row = styled.div`
  display: flex;
  width: 100%;
`

const ContentContainer = styled.div`
  width: 100%;
  margin: 5vh 5% 0 5%;
`

const Title = styled.h1`
  font-size: 36px;
`

const TeamsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Team = styled.div`
  width: 45%;
  height: auto;
`

const TeamImage = styled.div`
  width: 100%;
  height: 300px;
  background: #C4C4C4;
  border-radius: 5px;
  margin-top: 50px;
`

const TeamName = styled.p`
  font-size: 18px;
  margin-top: 10px;
`

const OverlayContainer = styled.div`
  position: relative;
`

const StarIcon = styled.img`
  position: absolute;
  top: 20px;
  right: 16px;
  height: 30px;
  width: 30px;
`

  // .favorites-icon:hover {
  //   cursor: pointer;
  // }