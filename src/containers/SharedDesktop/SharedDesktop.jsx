import React, { useContext } from "react"
import styled from "styled-components"

// TODO: leave button
// TODO: dynamic docs list
export default function SharedDesktop ({ location }) {
  let { link, type } = location.state;

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
              <Doc />
              <Doc />
              <Doc />
              <Doc />
              <Doc />
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
`
