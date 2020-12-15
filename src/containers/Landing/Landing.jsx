import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'
import { NavLink } from 'react-router-dom'
import firebase from 'firebase/app'
import { useDocument } from 'react-firebase-hooks/firestore'
import ReactModal from 'react-modal'
import Trashcan from 'assets/Landing/delete.svg'
import GroupIcon from 'assets/Landing/group.png'
import Pin from 'assets/Landing/pin.svg'

import LeftPanel from "containers/Panels/LeftPanel"
import ModalContent from 'containers/Modal/AddModalContent'
import DeleteModalContent from 'containers/Modal/DeleteModalContent'
import { OverlayContainer } from 'assets/StyledComponents/Overlay'
import { getTeamRef } from "shared/firebase";

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
          <TeamName>{name}</TeamName>
        </NavLink>
      </OverlayContainer>
    </Team>
  )
}

const FirebaseTeamCard = ({ teamId, setCurrentTeam, deleteTeam }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [teamDataDoc] = useDocument(
    getTeamRef(teamId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
      <Team
        to='/team'
        onClick={() => setCurrentTeam(teamId)}
      >
        <OverlayContainer>
          <TrashIcon onClick={() => setDeleteModalOpen(true)} src={Trashcan} />
          <PinIcon src={Pin} />
          <Circle>
            <Icon src={GroupIcon} />
          </Circle>
          <TeamName>{teamDataDoc && teamDataDoc.data() && teamDataDoc.data().name}</TeamName>
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
  const [teamNamesToId, setTeamNamesToId] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [userDataDoc] = useDocument(
    firebase.firestore().doc(`users/${user}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  useEffect(() => {
    if (userDataDoc) {
      setFirebaseTeams(userDataDoc.data().teams);

      async function getNewTeamNames() {
        let newTeamNamesToId = {};
        for (let teamId of userDataDoc.data().teams) {
          let teamName = await firebase.firestore().doc(`teams/${teamId.trim()}`).get();
          teamName = teamName.data().name;
          newTeamNamesToId[teamName] = teamId;
        }
        return newTeamNamesToId;
      }
      getNewTeamNames().then((result) => {
        setTeamNamesToId(result);
      })
    }
  }, [userDataDoc]);

  let teamsList;
  if (LOCALMODE) {
    teamsList = data["users"][user]["teams"];
  }

  useEffect(() => {
    let newList = [];
    for(let [name, id] of Object.entries(teamNamesToId)) {
      if (name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
        newList.push(id);
      }
    }
    setFirebaseTeams(newList);
  }, [searchValue]);

  const sortAZ = async () => {
    let teamNames = Object.keys(teamNamesToId)
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
        <HeaderRow>
          <Title>My Teams</Title>
          <div>
            <Input placeholder="Search for teams" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            <Button color="primary" onClick={sortAZ}>Sort A-Z</Button>
          </div>
        </HeaderRow>
        <SectionName>All</SectionName>
        {LOCALMODE ? (
          <TeamsContainer>
            {teamsList.map((teamId, i) => <TeamCard key={i} data={data} teamId={teamId} setCurrentTeam={setCurrentTeam} />)}
          </TeamsContainer>
        ) : (
          <TeamsContainer>
            <AddCard onClick={() => setModalOpen(true)}>
              <div>
                <AddText style={{ fontSize: '64px' }}>+</AddText>
                <AddText>Add a Team</AddText>
              </div>
            </AddCard>
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
      {/* <RightPanel page="Landing" setModalOpen={setModalOpen} /> */}
    </Row>
  )
}

const Row = styled.div`
  display: flex;
  width: 100%;
`

const HeaderRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const ContentContainer = styled.div`
  width: 100%;
  margin: 5vh 5% 0 5%;
`

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  font-size: 36px;
  line-height: 49px;
`

const TeamsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
`

const Team = styled(NavLink)`
  width: 30%;
  margin-right: 3%;
  height: auto;
  background-color: #ECF6FF;
  border-radius: 15px;
`

const TeamName = styled.p`
  margin-top: 10px;
  font-weight: 600;
  font-size: 22px;
  text-align: center;
  color: black;
`

const TrashIcon = styled.img`
  position: absolute;
  top: 0px;
  right: 10px;
  height: 25px;
  width: 25px;
`

const PinIcon = styled.img`
  position: absolute;
  top: 0px;
  left: 15px;
  height: 25px;
  width: 25px;
`

const Input = styled.input`
  width: 375px;
  border-radius: 5px;
  border: 2px solid #5C677D;
  font-size: 18px;
  padding: 5px 15px;
`

const Button = styled.button`
  width: 150px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 2px solid #5C677D;
  background-color: white;
  margin-left: 15px;
  font-size: 18px;
  color: #5C677D;
`

const SectionName = styled.div`
  font-family: Open Sans;
  font-weight: bold;
  font-size: 18px;
  color: #9B9B9B;
  margin-top: 40px;
`

const AddCard = styled.div`
  width: 30%;
  height: 250px;
  border: 2px solid #0466C8;
  border-radius: 15px;
  margin-right: 3%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
`

const AddText = styled.p`
  width: 100%;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: #0466C8;
  text-align: center;
`

const Circle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin: 0 auto;
  background: #0466C8;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled.img`
  width: 50px;
  height: 50px;
`