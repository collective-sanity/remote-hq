import React from "react"
import styled from "styled-components"
import firebase from 'firebase/app'
import { useDocument } from 'react-firebase-hooks/firestore';

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
  return (
    <TeamContainer>
      <Title>Team Summary</Title>
      <TeamCard>
        {users && users.map((user, i) => <Person user={user} key={i} />)}
      </TeamCard>
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