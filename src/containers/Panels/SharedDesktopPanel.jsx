import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import ControlContext from 'shared/control-context'
import { getLinkData } from "shared/firebase"
import { ContentContainer } from 'assets/StyledComponents/Shared'
import { useDocument } from 'react-firebase-hooks/firestore'
import { getLinkRef } from "shared/firebase"

import doc from 'assets/Landing/google-docs.png'
import sheet from 'assets/Landing/google-sheets.png'
import slides from 'assets/Landing/google-slides.png'
import drive from 'assets/Landing/google-drive.png'
import figma from 'assets/Landing/figma.png'
import link from 'assets/Landing/link.png'

export default function SharedDesktopPanel ({ firebaseLinks, linkData }) {
  const {
    LOCALMODE,
    data,
    currentTeam,
    currentLink,
    updateLink,
    deleteLink,
    currentFolder,
    setCurrentLink
  } = useContext(ControlContext);

  let history = useHistory();
  // useEffect(() => {
  //   if (currentLink) {
  //     if (LOCALMODE) {
  //       setPin(data["teams"][currentTeam]["links"][currentLink].pinned)
  //     } else {
  //       getLinkData(currentTeam, currentLink).then((doc) => {
  //         setPin(doc && doc.pinned)
  //       } )
  //     }
  //   }
  // },[currentLink, LOCALMODE, data, currentTeam])

  return (
    <Panel>
      <ContentContainer>
        <TextBtn onClick={ () => history.push("/folder") }>Leave</TextBtn>
        <TextBtn onClick={ () => updateLink() }>Edit Name</TextBtn>
        {linkData && !linkData.pinned ? (
            <TextBtn onClick={ () => updateLink(currentLink, {"pinned":!pinned}) }>Pin</TextBtn>
        ) : (
            <TextBtn onClick={ () => updateLink(currentLink, {"pinned":!pinned}) }>Unpin</TextBtn>
        )}

        <TextBtn onClick={ () => { deleteLink(); history.push("/folder"); } }>Delete</TextBtn>
        <Line />
        <div>
          <SectionName>All Folder Files:</SectionName>
          {firebaseLinks && firebaseLinks.data().links.map((link) => 
            <GetFirebaseLinks key={link} link={link} currentTeam={currentTeam} currentFolder={currentFolder} setCurrentLink={setCurrentLink} />
          )}
        </div>
      </ContentContainer>
    </Panel>
  )
}

const GetFirebaseLinks = ({ link, currentTeam, setCurrentLink }) => {
  const [linkDataDoc] = useDocument(
    getLinkRef(currentTeam, link),
    //firebase.firestore().collection("teams").doc(currentTeam).collection("links").doc(link),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      {linkDataDoc && linkDataDoc.data().linkType !== "resource" &&
        <WebDoc onClick={() => setCurrentLink(link)}>
          <Icon src={getIconType(linkDataDoc.data().linkType)} />
          <div>{linkDataDoc.data().name}</div>
        </WebDoc>
      }
      {linkDataDoc && linkDataDoc.data().linkType === "resource" &&
        <WebDoc href={linkDataDoc.data().url} target="_blank" onClick={() => setCurrentLink(link)}>
          <Icon src={getIconType(linkDataDoc.data().linkType)} />
          <div>{linkDataDoc.data().name}</div>
        </WebDoc>
      }
    </div>
  )
}

const getIconType = type => {
  if (type === "googleDoc") return doc;
  if (type === "googleSheet") return sheet;
  if (type === "googleSlides") return slides;
  if (type === "drive") return drive;
  if (type === "figma") return figma;
  if (type === "resource") return link;
}

const Panel = styled.div`
  min-height: 100vh;
  width: 12%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: auto;
`

const TextBtn = styled.button`
  font-size: 14px;
  cursor: pointer;
  color: #33415C;
  border: none;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 10px 0;
  width: 100%;
`

const Line = styled.hr `
  height: 1px;
  border-color: #33415C;
  width: 100%;
  margin: 30px 0 30px 0;
`


const WebDoc = styled.a`
  font-size: 14px;
  cursor: pointer;
  color: #33415C;
  border: none;
  border-radius: 10px;
  margin-bottom: 5px;
  width: 100%;
  display: flex;
  align-items: center;
`

const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
`

const SectionName = styled.p`
  font-size: 12px;
  color: #C4C4C4;
  margin-bottom: 5px;
`