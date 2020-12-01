import React, { useContext } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'
import Notification from '../../assets/Landing/bell.png'
import Chat from '../../assets/Landing/chat.png'
import MentalHealth from '../../assets/Landing/mental-health.png'

const Panel = styled.div`
  height: 100vh;
  width: 5%;
  border-left: 1px solid black;
  overflow: auto;
  display: flex;
  justify-content: center;
`

const Add = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background: #C4C4C4;
  border: none;
  margin-top: 5vh;
  font-size: 24px;
`

const Icon = styled.img`
  width: 100%;
  height: auto;
  margin-top: 40px;
  cursor: pointer;
`

const IconContainer = styled.div`
  position: absolute;
  bottom: 3vh;
  width: 40px;
`

function IconSection () {
  return (
    <IconContainer>
      <Icon src={Notification} />
      <Icon src={Chat} />
      <Icon src={MentalHealth} />
    </IconContainer>
  )
}

export default function RightPanel () {
  // const {
  //   user,
  //   createRoom,
  // } = useContext(ControlContext);
  
  return (
    <Panel>
      <section>
        {/* Add onClick={() => createRoom({users: [user.id]})} */}
        <Add>+</Add>
      </section>
      <IconSection />
    </Panel>
  )
}