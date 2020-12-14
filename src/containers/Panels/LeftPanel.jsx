import React, { useContext } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'
import firebase from 'firebase/app'
import { NavLink } from 'react-router-dom'
import { useDocument } from 'react-firebase-hooks/firestore';
import { getTeamRef, getUserRef } from "shared/firebase"

function Team ({ teamId }) {
  const { setCurrentTeam } = useContext(ControlContext);
  const [teamDataDoc] = useDocument(
    getTeamRef(teamId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <NavLink to='/team' onClick={() => setCurrentTeam(teamDataDoc.id)}>
      <TeamName>{teamDataDoc && teamDataDoc.data() && teamDataDoc.data().name}</TeamName>
    </NavLink>
  )
}

function Teams ({ teams }) {
  return (
    <TeamsSection>
      <MyTeams>My Teams:</MyTeams>
      {teams && teams.map((team, i) => <Team teamId={team} key={i} />)}
    </TeamsSection>
  )
}

export default function LeftPanel () {
  const {
    user,
    logoutUser,
  } = useContext(ControlContext);

  const [userDataDoc] = useDocument(
    getUserRef(user),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  
  return (
    <Panel>
      <section>
        <PhotoUrl src={userDataDoc && userDataDoc.data().photoUrl} alt='Profile' />
        {/* Only get user first name */}
        <Name>Hi, {userDataDoc && userDataDoc.data().displayName.split(' ')[0]}</Name>
      </section>
      <Teams teams={userDataDoc && userDataDoc.data().teams} />
      <LogoutBtn className='logoutBtn' onClick={() => logoutUser()}>Log Out</LogoutBtn>
    </Panel>
  )
}

const Panel = styled.div`
  height: 100vh;
  width: 10%;
  border-right: 1px solid black;
  overflow: auto;
`

const PhotoUrl = styled.img`
  border-radius: 50px;
  width: 70%;
  max-width: 100px;
  display: block;
  margin: 5vh auto 20px auto;
`

const Name = styled.p`
  font-size: 18px;
  text-align: center;
`

const LogoutBtn = styled.button`
  width:6%;
  font-size: 14px;
  display: block;
  margin-left: 1%;
  position: absolute;
  bottom: 3vh;
  cursor: pointer;
  background: #C4C4C4;
  border: none;
  padding: 10px;
  border-radius: 10px;
`

const TeamsSection = styled.div`
  margin-top: 75px;
  width: 80%;
  margin-left: 10%;
`

const MyTeams = styled.p`
  font-size: 16px;
`

const TeamName = styled.li`
  list-style: none;
  font-size: 12px;
  margin-left: 15%;
  margin-top: 10px;
`