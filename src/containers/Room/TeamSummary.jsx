import React from "react"
import styled from "styled-components"
import firebase from 'firebase/app'
import { useCollection, useCollectionData, useDocument } from 'react-firebase-hooks/firestore';

const Person = ({ user }) => {
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`users/${user.id}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  return (
    <PersonCard>
      <Photo src={value && value.data().photoUrl} alt='Profile' />
      <p>{value && value.data().displayName}</p>
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

const Photo = styled.img`
  width: 30%;
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
  height: 175px;
  background: #F0F0F0;
  border-radius: 5px;
  margin-top: 30px;
  padding: 20px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
`

const PersonCard = styled.div`
  width: 23%;
  height: 100%;
  margin-right: 1%;
  background: #C4C4C4;
  border-radius: 5px;
  display: inline-block;
`