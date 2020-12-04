import React, { useContext } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'
import LeftPanel from '../Panels/LeftPanel'
import RightPanel from '../Panels/RightPanel'
import Rooms from './Rooms'

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

export default function Landing () {
  const {
    user,
  } = useContext(ControlContext);
  
  return (
    <Row>
      <LeftPanel />
      <Rooms />
      <RightPanel />
    </Row>
  )
}