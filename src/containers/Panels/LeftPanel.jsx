import React, { useContext } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'
import { NavLink } from 'react-router-dom'
import { useDocument } from 'react-firebase-hooks/firestore';
import { getTeamRef, getUserRef } from "shared/firebase"
import TeamIcon from 'assets/Landing/gray-group.png'

function Team ({ teamId }) {
  const { setCurrentTeam } = useContext(ControlContext);
  const [teamDataDoc] = useDocument(
    getTeamRef(teamId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <TeamLink 
      to='/team' 
      onClick={() => setCurrentTeam(teamDataDoc.id)}
    >
      <Icon src={TeamIcon} />
      <TeamName>{teamDataDoc && teamDataDoc.data() && teamDataDoc.data().name}</TeamName>
    </TeamLink>
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
        <Name>{userDataDoc && userDataDoc.data().displayName.split(' ')[0]}</Name>
      </section>
      <Line />
      <Teams teams={userDataDoc && userDataDoc.data().teams} />
      <LogoutBtn className='logoutBtn' onClick={() => logoutUser()}>Log Out</LogoutBtn>
    </Panel>
  )
}

const Line = styled.hr `
  height: 1px;
  border-color: #33415C;
  width: 80%;
  margin: 30px 10% 30px 10%;
`

const Panel = styled.div`
  min-height: 100vh;
  width: 12%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
  width: 7%;
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
  width: 80%;
  margin-left: 10%;
`

const MyTeams = styled.p`
  font-size: 12px;
  color: #C4C4C4;
`

const TeamName = styled.li`
  list-style: none;
  font-size: 14px;
  color: #33415C;
`

const TeamLink = styled(NavLink)`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 15px;
`