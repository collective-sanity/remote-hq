import React, { useContext, useState } from "react"
import styled from "styled-components"
import firebase from 'firebase/app'
import { useDocument } from 'react-firebase-hooks/firestore'
import ControlContext from '../../shared/control-context'
import { NavLink } from 'react-router-dom'
import ReactModal from 'react-modal'
import { Breadcrumbs } from 'assets/StyledComponents/Shared'

import TeamSummary from './TeamSummary'
import TeamBoards from './TeamBoards'
import LeftPanel from "containers/Panels/LeftPanel"
import ModalContent from 'containers/Modal/AddModalContent'

export default function Room ({ location }) {
  const { currentTeam, createFolder } = useContext(ControlContext)
  const [modalOpen, setModalOpen] = useState(false)

   const [value] = useDocument( firebase.firestore()
 .doc( currentTeam!=null?`teams/${currentTeam.trim()}`: `teams/${window.localStorage.getItem("currentTeam").trim()}`),
         {snapshotListenOptions: { includeMetadataChanges: true },},);
  
  return (
    <Row>
      <LeftPanel />
      <RoomsContainer>
        <Breadcrumbs>
          <NavLink to='/'>Teams</NavLink>
          <Arrow> &gt; </Arrow>
          <NavLink to='/team'>{value && value.data().name}</NavLink></Breadcrumbs>
        <TeamSummary users={value && value.data().users} teamName={value && value.data().name} />
        <TeamBoards setModalOpen={setModalOpen} />
        <ReactModal isOpen={modalOpen} className="Modal" >
          <ModalContent 
            setModalOpen={setModalOpen} 
            createFunction={createFolder}
            labelName="New Folder Name"
            submitName="Create New Folder"
          />
        </ReactModal>
      </RoomsContainer>
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

const Arrow = styled.p`
  margin: 0 10px 0 10px;
`