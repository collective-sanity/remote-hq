import React, { useContext } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'

import GoogleDocs from '../../assets/Landing/google-docs.png'
import GoogleSheets from '../../assets/Landing/google-sheets.png'
import GoogleSlides from '../../assets/Landing/google-slides.png'
import FigmaIcon from '../../assets/Landing/figma.png'
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
const TopIcon = styled.img`
  width: auto;
  height: 40px;
  margin-top: 20px;
  cursor: pointer;
`

const TopIconContainer = styled.div`
  position: absolute;
  top: 3vh;
  width: 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const IconContainer = styled.div`
  position: absolute;
  bottom: 3vh;
  width: 40px;
`

const LeaveBtn = styled.button`
  width: 90%;
  height: 5%;
  font-size: 14px;
  display: block;
  cursor: pointer;
  background: #C4C4C4;
  border: none;
  padding: 10px;
  border-radius: 10px;
  margin: 0;
`
function TopIconSection ({ leave }) {
  return (
    <TopIconContainer>
      {/* Add onClick={() => createRoom({users: [user.id]})} */}
      {leave ? (
          <LeaveBtn className='leaveBtn' onClick={() => leave()}>Leave</LeaveBtn>
        ) : (
          <></>
      )}
      <Add>+</Add>
      <TopIcon src={GoogleDocs} />
      <TopIcon src={GoogleSheets} />
      <TopIcon src={GoogleSlides} />
      <TopIcon src={FigmaIcon} />
    </TopIconContainer>
  )
}

function IconSection () {
  return (
    <IconContainer>
      <Icon src={Notification} />
      <Icon src={Chat} />
      <Icon src={MentalHealth} />
    </IconContainer>
  )
}

export default function RightPanel ({ leave }) {
  // const {
  //   user,
  //   createRoom,
  // } = useContext(ControlContext);
  
  return (
    <Panel>
      <TopIconSection leave={leave} />
      <IconSection />
    </Panel>
  )
}