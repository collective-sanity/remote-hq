import React from "react"
import styled from "styled-components"
import queryString from 'query-string'
import firebase from 'firebase/app'
import { useCollection, useCollectionData, useDocument } from 'react-firebase-hooks/firestore';

import TeamSummary from './TeamSummary'
import TeamBoards from './TeamBoards'
import LeftPanel from "containers/Panels/LeftPanel";
import RightPanel from "containers/Panels/RightPanel";

export default function Room ({ location }) {
  const { id } = queryString.parse(location.search)

  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`teams/${id.trim()}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <Row>
      <LeftPanel />
      <RoomsContainer>
        <Breadcrumbs>{`MHCI > ${value.data().name}`}</Breadcrumbs>
        {/* <TeamSummary /> */}
        {/* <TeamBoards /> */}
      </RoomsContainer>
      <RightPanel />
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
`