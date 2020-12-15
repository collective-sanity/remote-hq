import React, { useState, useContext } from "react"
import styled from "styled-components"
import firebase from 'firebase/app'
import { useDocument } from 'react-firebase-hooks/firestore'
import ReactModal from 'react-modal'
import ControlContext from "shared/control-context"
import ModalContent from 'containers/Modal/AddModalContent'
import { Title, HeaderRow } from 'assets/StyledComponents/Shared'

const Person = ({ user }) => {
  const [value] = useDocument(
    firebase.firestore().doc(`users/${user.id}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  return (
    <PersonCard>
      <Photo src={value && value.data().photoUrl} alt='Profile' />
      <Name>{value && value.data().displayName}</Name>
    </PersonCard>
  )
}

export default function Room ({ users, teamName }) {
  const [modalOpen, setModalOpen] = useState(false)
  const { addTeamMember } = useContext(ControlContext);

  return (
    <TeamContainer>
      <Title>{teamName}</Title>
      <TeamCard>
        <PersonCard style={{ cursor: 'pointer' }}>
          <AddBtn onClick={() => setModalOpen(true)}>+</AddBtn>
          <Name><b>Add a Member</b></Name>
        </PersonCard>
        {users && users.map((user, i) => <Person user={user} key={i} />)}
      </TeamCard>
      <ReactModal isOpen={modalOpen} className="Modal" >
        <ModalContent 
          setModalOpen={setModalOpen} 
          createFunction={addTeamMember}
          labelName="Enter Member Email"
          submitName="Add Team Member"
        />
      </ReactModal>
    </TeamContainer>
  )
}

const Name = styled.p`
  font-size: 14px;
  text-align: center;
  margin-bottom: 0;
  margin-top: 8px;
`

const Photo = styled.img`
  width: 50px;
  display: block;
  margin: 0 auto;
  border-radius: 50px;
`

const AddBtn = styled.div`
  width: 50px;
  height: 50px;
  background: #0466C8;
  display: block;
  margin: 0 auto;
  border-radius: 50px;
  font-size: 36px;
  color: white;
  text-align: center;
`

const TeamContainer = styled.div`
  width: 100%;
  height: 225px;
`

const TeamCard = styled.div`
  height: auto;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  margin-top: 30px;
  padding: 20px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
`

const PersonCard = styled.div`
  width: 13%;
  margin-right: 1%;
  border-radius: 5px;
  display: inline-block;
`