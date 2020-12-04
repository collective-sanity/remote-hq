import React from "react"
import styled from "styled-components"
import { Link } from 'react-router-dom'

export default function TeamBoards () {

  return (
    <TeamContainer>
      <Title>Team Boards</Title>
      <BoardContainer>
        <NavLink to='/folder'>
          <Board></Board>
        </NavLink>
        <NavLink to='/folder'>
          <Board></Board>
        </NavLink>
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

const NavLink = styled(Link)`
  width: 46%;
  height: 375px;
` 

const Board = styled.div`
  width: 100%;
  height: 100%;
  background: #F0F0F0;
  border-radius: 5px;
  margin-top: 30px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
`