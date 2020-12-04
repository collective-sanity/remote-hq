import React, { useContext } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom";

import doc from '../../assets/Landing/google-docs.png';
import sheet from '../../assets/Landing/google-sheets.png';
import slides from '../../assets/Landing/google-slides.png';
import figma from '../../assets/Landing/figma.png';

// TODO: leave button
// TODO: dynamic docs list
// TODO: pin
export default function SharedDesktop ({ location }) {
  let { link, type } = location.state;

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
    if (type === "doc") return doc;
    if (type === "sheet") return sheet;
    if (type === "slides") return slides;
    if (type === "figma") return figma;
  }

  const getLink = type => {
    if (type === "figma") {
      return `https://www.figma.com/embed?embed_host=astra&url=${link}`
    }
    return link;
  }

    return (
      <Row>
        <Desktop>
            <iframe 
                width="100%"
                height="100%"
                src={getLink(type)}
            ></iframe>
        </Desktop> 

        <Docs>
            <DocsTitle>Chatbot</DocsTitle>
            <DocsList>
              {docs.map((doc) => 
                <Doc>
                  <DocIcon src={getIconType(doc.type)}></DocIcon>
                  <DocTitle>{doc.title}</DocTitle>
                </Doc>
              )}
            </DocsList>
        </Docs>       
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

const DocIcon = styled.img`
  height: 50%;
`

const DocTitle = styled.div`
  font-size: 14px;
`
