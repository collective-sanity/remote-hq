import React, { useContext } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'

function Teams ({ teams }) {
  return (
    <TeamsSection>
      <MyTeams>My Teams:</MyTeams>
      <ul>
        {teams.map((team, i) => <Team key={i}>{team.name}</Team>)}
      </ul>
    </TeamsSection>
  )
}

export default function LeftPanel () {
  const {
    user,
    teams,
    logoutUser,
  } = useContext(ControlContext);
  
  return (
    <Panel>
      <section>
        <PhotoUrl src={user.photoUrl} alt='Profile' />
        {/* Only get user first name */}
        <Name>Hi, {user.displayName.split(' ')[0]}</Name>
      </section>
      <Teams teams={teams} />
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

const Team = styled.li`
  list-style: none;
  font-size: 12px;
  margin-left: 15%;
  margin-top: 10px;
`