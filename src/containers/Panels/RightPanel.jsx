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

export default function RightPanel ({ leave, page }) {
  // const {
  //   user,
  //   createRoom,
  // } = useContext(ControlContext);
  
  return (
    <Panel>
      {getTopIcons(page)}
      <IconSection />
    </Panel>
  )
}

const getTopIcons = (page) => {
  if (page === "FolderView") {
    return (
      <TopIconContainer>
        <TopIcon src={GoogleDocs} />
        <TopIcon src={GoogleSheets} />
        <TopIcon src={GoogleSlides} />
        <TextBtn onClick={() => {}}>Edit</TextBtn>
        <TextBtn onClick={() => {}}>Delete</TextBtn>
      </TopIconContainer>
    )
  }
  if (page === "SharedDesktop") {
    return (
      <TopIconContainer>
        <TextBtn onClick={() => {}}>Leave</TextBtn>
        <TextBtn onClick={() => {}}>Rename</TextBtn>
        <TextBtn onClick={() => {}}>Pin</TextBtn>
        <TextBtn onClick={() => {}}>Delete</TextBtn>
      </TopIconContainer>
    );
  }
  return (
    <TopIconContainer>
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

const TextBtn = styled.button`
  width: 90%;
  height: 5%;
  font-size: 14px;
  display: block;
  cursor: pointer;
  background: #C4C4C4;
  border: none;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
`