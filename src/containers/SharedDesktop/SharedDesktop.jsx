import React, { useContext } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'

import LeftPanel from "containers/Panels/LeftPanel"
import RightPanel from "containers/Panels/RightPanel"

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
    justify-content: center;
`

export default function SharedDesktop () {
    return (
      <Row>
        <LeftPanel />

        <Desktop>
            <iframe 
                width="100%"
                height="100%"
                src="https://docs.google.com/spreadsheets/d/1QgJwm8rLpO70HNxzvzGGRhmskoYSe7MQhhsWrYiICgQ"
            ></iframe>
        </Desktop> 

        <Docs>
            Chatbot
        </Docs>       

        <RightPanel leave={true} />
      </Row>
    )
  }