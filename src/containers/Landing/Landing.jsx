import React, { useContext } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'
import { NavLink } from 'react-router-dom'
import dummydata from '../../shared/dummydata'
import LeftPanel from "containers/Panels/LeftPanel";
import RightPanel from "containers/Panels/RightPanel";
import EmptyStar from '../../assets/Landing/star.svg'

const getTeams = (teams) => {
  const allTeams = dummydata.teams
  const userTeams = []

  for (let i=0; i<Object.keys(allTeams).length; i++) {
    if (teams[0].includes(Object.keys(allTeams)[i])) {
      userTeams.push(allTeams[Object.keys(allTeams)[i]])
    }
  }

  return userTeams
}

const TeamCard = (team) => {
  console.log(team)
  return (
    <Team>
      <NavLink to='/folder'>
        <TeamImage>
          <OverlayContainer>
            <StarIcon src={EmptyStar} />
          </OverlayContainer>
        </TeamImage>
        <TeamName>{team.team.name}</TeamName>
      </NavLink>
    </Team>
  )
}

export default function Landing () {
  const { teams } = useContext(ControlContext);
  const userTeams = getTeams(teams)

  return (
    <React.Fragment>
      <LeftPanel />
      <ContentContainer>
        <Title>Your Teams</Title>
        <TeamsContainer>
          {userTeams.map((team, i) => <TeamCard key={i} team={team} />)}
        </TeamsContainer>
      </ContentContainer>
      <RightPanel />
    </React.Fragment>
  )
}

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