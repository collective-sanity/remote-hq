import React, { useContext } from "react"
import styled from "styled-components"
import firebase from 'firebase/app'
import { useCollection, useCollectionData, useDocument } from 'react-firebase-hooks/firestore'
import ControlContext from '../../shared/control-context'
import { NavLink } from 'react-router-dom'

import TeamSummary from './TeamSummary'
import TeamBoards from './TeamBoards'
import LeftPanel from "containers/Panels/LeftPanel"
import RightPanel from "containers/Panels/RightPanel"

export default function Room ({ location }) {
  const { currentTeam } = useContext(ControlContext)

  const [value] = useDocument(
    firebase.firestore().doc(`teams/${currentTeam.trim()}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <Row>
      <LeftPanel />
      <RoomsContainer>
        <Breadcrumbs>
          <NavLink to='/'>Teams</NavLink>
          <Arrow> &gt; </Arrow>
          <NavLink to='/team'>{value && value.data().name}</NavLink></Breadcrumbs>
        <TeamSummary users={value && value.data().users} />
        <TeamBoards />
      </RoomsContainer>
      <RightPanel page="Team" />
    </Row>
  )
}

const Row = styled.div`
  display: flex;
  width: 100%;
`

const RoomsContainer = styled.div`
  width: 100%;
  margin: 5vh 5% 0 5%;
`

const Breadcrumbs = styled.div`
  font-size: 24px;
  margin-bottom: 30px;
  display: flex;
`

const Arrow = styled.p`
  margin: 0 10px 0 10px;
`