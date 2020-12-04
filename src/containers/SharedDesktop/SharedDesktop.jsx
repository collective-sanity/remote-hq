import React, { useContext } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'

import LeftPanel from "containers/Panels/LeftPanel"
import RightPanel from "containers/Panels/RightPanel"

// TODO: leave button
const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

const Desktop = styled.div`
    width: 65%;
    height: 100vh;
    overflow: auto;
    display: flex;
    justify-content: center;
`

const Docs = styled.div`
    width: 20%;
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
  background-color: #c4c4c4;`

export default function SharedDesktop ({ location }) {
  let { link, type } = location.state;

    return (
      <Row>
        <LeftPanel />

        <Desktop>
            <iframe 
                width="100%"
                height="100%"
                src={link}
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

        <RightPanel leave={true} />
      </Row>
    )
  }