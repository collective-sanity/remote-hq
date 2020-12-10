import React, { useContext, useState, useEffect } from "react";
import { Button } from 'reactstrap';
import styled from "styled-components"
import ControlContext from '../../shared/control-context'
import { NavLink } from 'react-router-dom'
import firebase from 'firebase/app'
import { useDocument } from 'react-firebase-hooks/firestore'
import ReactModal from 'react-modal'
import Trashcan from 'assets/Landing/delete.svg'

import LeftPanel from "containers/Panels/LeftPanel"
import RightPanel from "containers/Panels/RightPanel"
import ModalContent from 'containers/Modal/AddModalContent'
import DeleteModalContent from 'containers/Modal/DeleteModalContent'
import { OverlayContainer } from 'assets/StyledComponents/Overlay'

const TeamCard = ({ teamId, data, setCurrentTeam }) => {
  let name = data["teams"][teamId].name;

  return (
    <Team>
      <OverlayContainer>
        <TrashIcon src={Trashcan} />
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
      </OverlayContainer>
    </Team>
  )
}

const FirebaseTeamCard = ({ teamId, setCurrentTeam, deleteTeam }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [value] = useDocument(
    firebase.firestore().doc(`teams/${teamId.trim()}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <Team>
      <OverlayContainer>
        <TrashIcon onClick={() => setDeleteModalOpen(true)} src={Trashcan} />
        <NavLink 
          to='/team'
          onClick={() => setCurrentTeam(teamId)}
        >
          <TeamImage />
          <TeamName>{value && value.data() && value.data().name}</TeamName>
        </NavLink>
        <ReactModal isOpen={deleteModalOpen} className="Modal" >
          <DeleteModalContent 
            setModalOpen={setDeleteModalOpen} 
            deleteFunction={deleteTeam}
            id={teamId}
            labelName="Delete Team?"
          />
        </ReactModal>
      </OverlayContainer>
    </Team>
  )
}

export default function Landing () {
  const { LOCALMODE, data, user, createTeam, setCurrentTeam, deleteTeam } = useContext(ControlContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [firebaseTeams, setFirebaseTeams] = useState([]);

  const [value] = useDocument(
    firebase.firestore().doc(`users/${user}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  useEffect(() => {
    if (value) {
      setFirebaseTeams(value.data().teams);
    }
  }, [value]);

  let teamsList;
  if (LOCALMODE) {
    teamsList = data["users"][user]["teams"];
  }

  const sortAZ = async () => {
    let teamNamesToId = {};
    let teamNames = []
    for (let teamId of firebaseTeams) {
      let teamName = await firebase.firestore().doc(`teams/${teamId.trim()}`).get();
      teamName = teamName.data().name;
      teamNamesToId[teamName] = teamId;
      teamNames.push(teamName);
    }
    teamNames.sort((a, b) => {
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      return 0;
    });
    setFirebaseTeams(teamNames.map((name) => teamNamesToId[name]));
  }

  return (
    <Row>
      <LeftPanel />
      <ContentContainer>
        <Title>Teams</Title>
        <Button color="primary" onClick={sortAZ}>Sort A-Z</Button>
        {LOCALMODE ? (
          <TeamsContainer>
            {teamsList.map((teamId, i) => <TeamCard key={i} data={data} teamId={teamId} setCurrentTeam={setCurrentTeam} />)}
          </TeamsContainer>
        ) : (
          <TeamsContainer>
            {firebaseTeams && firebaseTeams.map((teamId, i) => <FirebaseTeamCard key={i} teamId={teamId} setCurrentTeam={setCurrentTeam} deleteTeam={deleteTeam} />)}
          </TeamsContainer>
        )}
        <ReactModal isOpen={modalOpen} className="Modal" >
          <ModalContent 
            setModalOpen={setModalOpen} 
            createFunction={createTeam}
            labelName="New Team Name"
            submitName="Create New Team"
          />
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

const TrashIcon = styled.img`
  position: absolute;
  top: 15px;
  right: 15px;
  height: 30px;
  width: 30px;
`
