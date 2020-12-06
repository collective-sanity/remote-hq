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
  let { currentLink, setCurrentLink, currentFolder } = context;

  useEffect(() => {
    console.log(context);
  })

  const docs = [
    {
      title: "meep",
      link: "https://docs.google.com/document/d/19R4d_-EHnhiGkq2x9iUOYZttT3aflE8fzbZB4J7ZOh4/",
      type: "doc"
    },
    {
      title: "beep",
      link: "https://docs.google.com/spreadsheets/d/1QgJwm8rLpO70HNxzvzGGRhmskoYSe7MQhhsWrYiICgQ/",
      type: "sheet"
    },
    {
      title: "meow",
      link: "https://docs.google.com/presentation/d/1u1dJoPthkIsEa_IAIrLYTvQRk6MYtzw6YCvRL1cL3xk/",
      type: "slides"
    },
    {
      title: "test",
      link: "https://www.figma.com/file/jSPgLf0DbOKa9bdztdMngs/Mobile?node-id=0%3A1",
      type: "figma"
    },
  ];

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

    return (
      <Row>
        <LeftPanel />
        <Desktop>
            <iframe 
                width="100%"
                height="100%"
                src={getLink(currentLink.type)}
                title={currentLink.title}
                sandbox
                allowFullScreen
            ></iframe>
        </Desktop> 

        <Docs>
            <DocsTitle>Chatbot</DocsTitle>
            <DocsList>
              {currentFolder.links.map((link) => 
                <Doc onClick={() => setCurrentLink(link)}>
                  <DocIcon src={getIconType(link.linkType)}></DocIcon>
                  <DocTitle>{link.name}</DocTitle>
                </Doc>
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
