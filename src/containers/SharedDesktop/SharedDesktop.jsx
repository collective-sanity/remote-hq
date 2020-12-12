import React, { useContext, useEffect } from "react"
import styled from "styled-components"
// import { Link } from "react-router-dom";
import firebase from 'firebase/app';
import { useDocument } from 'react-firebase-hooks/firestore';
import ControlContext from "shared/control-context";

import LeftPanel from "containers/Panels/LeftPanel";
import RightPanel from "containers/Panels/RightPanel";

import doc from 'assets/Landing/google-docs.png';
import sheet from 'assets/Landing/google-sheets.png';
import slides from 'assets/Landing/google-slides.png';
import drive from 'assets/Landing/google-drive.png';
import figma from 'assets/Landing/figma.png';
import link from 'assets/Landing/link.png';

export default function SharedDesktop () {
  const context = useContext(ControlContext);
  const { LOCALMODE, data, currentTeam, currentFolder, setCurrentLink, currentLink } = context;

  let links;
  let currentLinkObj;
  if (LOCALMODE) {
    links = data["teams"][currentTeam]["folders"][currentFolder]["links"];
    currentLinkObj = data["teams"][currentTeam]["links"][currentLink];
  }

  const [firebaseLinks] = useDocument(
    firebase.firestore().collection("teams").doc(currentTeam).collection("folders").doc(currentFolder),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [value] = useDocument(
    firebase.firestore().collection("teams").doc(currentTeam).collection("links").doc(currentLink),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    // console.log(currentFolder);
  })

  const getLink = (type, link) => {
    if (LOCALMODE) {
      if (type === "figma") {
        return `https://www.figma.com/embed?embed_host=share&url=${currentLinkObj.link}`
      }
      return currentLinkObj.link;
    }
    else { 
      if (type === "figma") {
        return `https://www.figma.com/embed?embed_host=share&url=${link}`
      }
      return link;}
    }

    return (
      <Row>
        <LeftPanel />
        <Desktop>
          {LOCALMODE ? (
            <iframe 
              width="100%"
              height="100%"
              src={getLink(currentLinkObj.linkType)}
              title={currentLinkObj.name}
              allowFullScreen
          ></iframe>
          ) : (
            <iframe 
                width="100%"
                height="100%"
                src={value && getLink(value.data().linkType, value.data().url)}
                title={value && value.data().name}
                allowFullScreen
            ></iframe>
          )}
        </Desktop> 

        <Docs>
            {/* <DocsTitle>Chatbot</DocsTitle> */}
            {LOCALMODE ? (
              <DocsList>
                {links.map((link) => 
                  <GetLinks link={link} data={data} currentTeam={currentTeam} currentFolder={currentFolder} setCurrentLink={setCurrentLink} />
                )}
              </DocsList>
            ) : (
              <DocsList>
                {firebaseLinks && firebaseLinks.data().links.map((link) => 
                  <GetFirebaseLinks key={link} link={link} currentTeam={currentTeam} currentFolder={currentFolder} setCurrentLink={setCurrentLink} />
                )}
              </DocsList>
            )}
        </Docs>  
        <RightPanel page={"SharedDesktop"} />     
      </Row>
    )
  }

const GetLinks = ({link, data, currentTeam, setCurrentLink}) => {
  let item = data["teams"][currentTeam]["links"][link];

  return (
    <div>
      {item.linkType !== "resource" &&
        <Doc key={link} onClick={() => setCurrentLink(link)}>
          <DocIcon src={getIconType(item.linkType)}></DocIcon>
          <DocTitle>{item.name}</DocTitle>
        </Doc>
      }
      {item.linkType === "resource" &&
        <WebDoc href={item.link} target="_blank" key={link} onClick={() => setCurrentLink(link)}>
          <DocIcon src={getIconType(item.linkType)}></DocIcon>
          <DocTitle>{item.name}</DocTitle>
        </WebDoc>
      }
    </div>
  )
}

const GetFirebaseLinks = ({ link, currentTeam, setCurrentLink }) => {
  const [value] = useDocument(
    firebase.firestore().collection("teams").doc(currentTeam).collection("links").doc(link),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      {value && value.data().linkType !== "resource" &&
        <Doc onClick={() => setCurrentLink(value.id)}>
          <DocIcon src={getIconType(value.data().linkType)}></DocIcon>
          <DocTitle>{value.data().name}</DocTitle>
        </Doc>
      }
      {value && value.data().linkType === "resource" &&
        <WebDoc href={value.data().url} target="_blank" onClick={() => setCurrentLink(value.id)}>
          <DocIcon src={getIconType(value.data().linkType)}></DocIcon>
          <DocTitle>{value.data().name}</DocTitle>
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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Desktop = styled.div`
  width: 75%;
  height: 100vh;
  overflow: auto;
  display: flex;
  justify-content: center;
`

const Docs = styled.div`
  width: 25%;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
`

const DocsTitle = styled.div`
font-size: 36px;
margin-top: 30px;
`
const DocsList = styled.div`
margin-top: 30px;
margin-left: 20px;
width: 70%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
`

const Doc = styled.div`
  width: 69px;
  height: 91px;
  margin-bottom: 20px;
  margin-right: 20px;
  background-color: #c4c4c4;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const WebDoc = styled.a`
  width: 69px;
  height: 91px;
  margin-bottom: 20px;
  margin-right: 20px;
  background-color: #c4c4c4;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const DocIcon = styled.img`
  height: 50%;
`

const DocTitle = styled.div`
  font-size: 14px;
`
