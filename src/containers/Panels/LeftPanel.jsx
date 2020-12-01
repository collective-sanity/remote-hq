import React, { useContext } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'

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
  width: 8%;
  font-size: 18px;
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

export default function LeftPanel () {
  const {
    user,
    logoutUser,
  } = useContext(ControlContext);
  
  return (
    <Panel>
      <section>
        <PhotoUrl src={user.photoUrl} alt='Profile' />
        {/* Only get user first name */}
        <Name>Hi, {user.displayName.split(' ')[0]}</Name>
      </section>
      <LogoutBtn className='logoutBtn' onClick={() => logoutUser()}>Log Out</LogoutBtn>
    </Panel>
  )
}