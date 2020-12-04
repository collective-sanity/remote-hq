import React from "react"
import styled from "styled-components"
import queryString from 'query-string'
import TeamSummary from './TeamSummary'
import TeamBoards from './TeamBoards'

export default function Room ({ location }) {
  const { name } = queryString.parse(location.search)

  return (
    <RoomsContainer>
      <Breadcrumbs>{`MHCI > ${name}`}</Breadcrumbs>
      <TeamSummary />
      <TeamBoards />
    </RoomsContainer>
  )
}

const RoomsContainer = styled.div`
  width: 100%;
  margin: 5vh 5% 0 5%;
`

const Breadcrumbs = styled.div`
  font-size: 24px;
  margin-bottom: 30px;
`