import React, { useState, useContext } from "react"
import styled from "styled-components"
import firebase from 'firebase/app'
import { useDocument, useCollection } from 'react-firebase-hooks/firestore'
import ReactModal from 'react-modal'
import ControlContext from "shared/control-context"
import ModalContent from 'containers/Modal/AddModalContent'

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

export default function Room ({ users }) {
  const [modalOpen, setModalOpen] = useState(false)
  const { addTeamMember } = useContext(ControlContext);

  return (
    <TeamContainer>
      <Row>
        <Title>Team Summary</Title>
        <AddBtn onClick={() => setModalOpen(true)} >Add a Team Member</AddBtn>
      </Row>
      <TeamCard>
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
`

const Photo = styled.img`
  width: 20%;
  display: block;
  margin: 10px auto;
  border-radius: 50px;
`

const TeamContainer = styled.div`
  width: 100%;
  height: 225px;
`

const Title = styled.h1`
  font-size: 36px;
`

const TeamCard = styled.div`
  height: auto;
  background: #F0F0F0;
  border-radius: 5px;
  margin-top: 30px;
  padding: 20px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
`

const PersonCard = styled.div`
  width: 18%;
  margin-right: 1%;
  background: #C4C4C4;
  border-radius: 5px;
  display: inline-block;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const AddBtn = styled.button`
  border-radius: 5px;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`