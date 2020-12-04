import React, { useContext } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'
import queryString from 'query-string'

export default function Room () {

  return (
    <TeamContainer>
      <Title>Team Summary</Title>
      <TeamCard></TeamCard>
    </TeamContainer>
  )
}

const TeamContainer = styled.div`
  width: 100%;
  height: 225px;
`

const Title = styled.h1`
  font-size: 36px;
`

const TeamCard = styled.div`
  height: 140px;
  background: #F0F0F0;
  border-radius: 5px;
  margin-top: 30px;
`