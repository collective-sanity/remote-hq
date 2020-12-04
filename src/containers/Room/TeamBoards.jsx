import React from "react"
import styled from "styled-components"

export default function TeamBoards () {

  return (
    <TeamContainer>
      <Title>Team Boards</Title>
      <BoardContainer>
        <Board></Board>
        <Board></Board>
      </BoardContainer>
    </TeamContainer>
  )
}

const TeamContainer = styled.div`
  margin-top: 50px;
`

const BoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.h1`
  font-size: 36px;
`

const Board = styled.div`
  width: 46%;
  height: 375px;
  background: #F0F0F0;
  border-radius: 5px;
  margin-top: 30px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
`