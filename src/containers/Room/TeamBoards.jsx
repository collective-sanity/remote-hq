import React, { useContext } from "react"
import styled from "styled-components"
import { Link } from 'react-router-dom'
import ControlContext from '../../shared/control-context'

export default function TeamBoards () {
  const context = useContext(ControlContext);
  let { data, currentTeam, setCurrentFolder } = context;

  let foldersObj = data["teams"][currentTeam]["folders"];
  let folders = Object.keys(foldersObj);
  let meep = data["teams"][currentTeam]["folders"]

  console.log(folders)

  return (
    <TeamContainer>
      <Title>Team Boards</Title>
      <BoardContainer>
        {folders.map((folder, i) => 
          <Board>
            <BoardLink folder={folder} data={data} setCurrentFolder={setCurrentFolder} currentTeam={currentTeam} />
          </Board>
        )}
      </BoardContainer>
    </TeamContainer>
  )
}

const BoardLink = ({ folder, data, currentTeam, setCurrentFolder }) => {
  console.log(folder)
  let name = data["teams"][currentTeam]["folders"][folder].name;

  return (
    <NavLink 
      to='/folder'
      onClick={() => setCurrentFolder(folder)}
    >
      {name}
    </NavLink>
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