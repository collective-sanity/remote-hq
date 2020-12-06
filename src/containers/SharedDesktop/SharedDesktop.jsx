import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom";

import LeftPanel from "containers/Panels/LeftPanel";
import RightPanel from "containers/Panels/RightPanel";
import ControlContext from "shared/control-context";

import doc from '../../assets/Landing/google-docs.png';
import sheet from '../../assets/Landing/google-sheets.png';
import slides from '../../assets/Landing/google-slides.png';
import drive from '../../assets/Landing/google-drive.png';
import figma from '../../assets/Landing/figma.png';


// TODO: leave button

// TODO: pin
// TODO: delete
// TODO: edit name
export default function SharedDesktop () {
  const context = useContext(ControlContext);
  const { data, currentTeam, currentFolder, setCurrentLink, currentLink } = context;

  let links = data["teams"][currentTeam]["folders"][currentFolder]["links"];

  useEffect(() => {
    console.log(currentFolder);
  })

  const getIconType = type => {
    if (type === "googledoc") return doc;
    if (type === "googlesheet") return sheet;
    if (type === "googleslides") return slides;
    if (type === "drive") return drive;
    if (type === "figma") return figma;
  }

  const getLink = type => {
    if (type === "figma") {
      return `https://www.figma.com/embed?embed_host=share&url=${currentLink.link}`
    }
    return currentLink.link;
  }

  const getLinks = (link, data, currentTeam) => {
    let item = data["teams"][currentTeam]["links"][link];

    return (
      <Doc onClick={() => setCurrentLink(item)}>
        <DocIcon src={getIconType(item.linkType)}></DocIcon>
        <DocTitle>{item.name}</DocTitle>
      </Doc>
    )
  }

    return (
      <Row>
        <LeftPanel />
        <Desktop>
            <iframe 
                width="100%"
                height="100%"
                src={getLink(currentLink.linkType)}
                title={currentLink.name}
                sandbox
                allowFullScreen
            ></iframe>
        </Desktop> 

        <Docs>
            <DocsTitle>Chatbot</DocsTitle>
            <DocsList>
              {links.map((link) => 
                getLinks(link, data, currentTeam, currentFolder)
              )}
            </DocsList>
        </Docs>  
        <RightPanel page={"SharedDesktop"} />     
      </Row>
    )
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

const Doc = styled(Link)`
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
