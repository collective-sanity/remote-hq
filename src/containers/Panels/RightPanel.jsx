import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import ControlContext from 'shared/control-context'
import firebase from 'firebase/app'
// import Chat from 'components/Chat/Chat';

import GoogleDocs from 'assets/Landing/google-docs.png'
import GoogleSheets from 'assets/Landing/google-sheets.png'
import GoogleSlides from 'assets/Landing/google-slides.png'
import FigmaIcon from 'assets/Landing/figma.png'
// import Notification from 'assets/Landing/bell.png'
// import MentalHealth from 'assets/Landing/mental-health.png'

export default function RightPanel ({ page, setModalOpen }) {
  const {
    LOCALMODE,
    data,
    createTeam,
    updateTeam,
    deleteTeam,
    currentTeam,
    currentLink,
    createFolder,
    updateFolder,
    deleteFolder,
    pinLink,
    createLink,
    deleteLink,
    updateLink,
  } = useContext(ControlContext);

  let history = useHistory();

  let [pinned, setPin] = useState(false);
  useEffect(() => {
    if (currentLink) {
      if (LOCALMODE) {
        setPin(data["teams"][currentTeam]["links"][currentLink].pinned)
      } else {
        firebase
          .firestore()
          .collection("teams")
          .doc(currentTeam)
          .collection("links")
          .doc(currentLink)
          .get()
          .then((doc) => {
            setPin(doc.data().pinned)
          })
      }
    }
  })

  const getTopIcons = (page, history) => {
    if (page === "Landing") {
      return (
        <TopIconContainer>
          <Add onClick={() => setModalOpen(true)}>+</Add>
          <TextBtn onClick={() => {}}>Edit</TextBtn>
          {/* <TextBtn onClick={() => deleteTeam()}>Delete</TextBtn> */}
        </TopIconContainer>
      )
    }
    else if (page === "Team") {
      return (
        <TopIconContainer>
          <Add onClick={() => setModalOpen(true)}>+</Add>
          <TextBtn onClick={() => {}}>Edit</TextBtn>
          {/* <TextBtn onClick={() => deleteFolder()}>Delete</TextBtn> */}
        </TopIconContainer>
      )
    }
    else if (page === "FolderView") {
      return (
        <TopIconContainer>
          <TopIcon src={GoogleDocs} onClick={() => createLink("googleDoc")} />
          <TopIcon src={GoogleSheets} onClick={() => createLink("googleSheet")} />
          <TopIcon src={GoogleSlides} onClick={() => createLink("googleSlides")} />
          <TopIcon src={FigmaIcon} onClick={() => createLink("figma")} />
          <Add onClick={() => createLink("resource")}>+</Add>
          <TextBtn onClick={() => {}}>Edit</TextBtn>
          <TextBtn onClick={() => {}}>Delete</TextBtn>
        </TopIconContainer>
      )
    }
    else if (page === "SharedDesktop") {
      let item;
      if (LOCALMODE) {
        item = data["teams"][currentTeam]["links"][currentLink];
      }
      return (
        <TopIconContainer>
          <TextBtn onClick={ () => history.push("/folder") }>Leave</TextBtn>
          <TextBtn onClick={ () => updateLink() }>Edit</TextBtn>

          {!pinned ? (
              <TextBtn onClick={ () => pinLink() }>Pin</TextBtn>
          ) : (
              <TextBtn onClick={ () => pinLink() }>Unpin</TextBtn>
          )}

          <TextBtn onClick={ () => { deleteLink(); history.push("/folder"); } }>Delete</TextBtn>
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
  
  return (
    <Panel>
      {getTopIcons(page, history)}
      {/* <IconSection /> */}
    </Panel>
  )
}

// function IconSection () {
//   return (
//     <IconContainer>
//       <Icon src={Notification} />
//       <Icon src={Chat} />
//       <Icon src={MentalHealth} />
//     </IconContainer>
//   )
// }

const Panel = styled.div`
  height: 100vh;
  width: 8%;
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

// const Icon = styled.img`
//   width: 100%;
//   height: auto;
//   margin-top: 40px;
//   cursor: pointer;
// `
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

// const IconContainer = styled.div`
//   position: absolute;
//   bottom: 3vh;
//   width: 40px;
// `

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