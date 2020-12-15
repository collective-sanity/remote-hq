import React, { useEffect, useContext, useState } from "react"
import styled from "styled-components"
import { Link } from 'react-router-dom'
import ControlContext from '../../shared/control-context'
import { useCollection } from 'react-firebase-hooks/firestore';
import Trashcan from 'assets/Landing/delete.svg'
import { OverlayContainer } from 'assets/StyledComponents/Overlay'
import ReactModal from 'react-modal'
import DeleteModalContent from 'containers/Modal/DeleteModalContent'
import './TeamBoards.scss';
import { getTeamRef } from "shared/firebase";
import { Title, Input, FilterButton, HeaderRow } from 'assets/StyledComponents/Shared'
import FolderIcon from 'assets/Landing/folder.svg'

export default function TeamBoards ({ setModalOpen }) {
  const context = useContext(ControlContext);
  let { LOCALMODE, data, currentTeam, setCurrentFolder, deleteFolder } = context;
  const [firebaseFolders, setFirebaseFolders] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  // console.log(currentTeam)

  const [value] = useCollection(
    getTeamRef(currentTeam).collection("folders"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  useEffect(() => {
    if (value) {
      setFirebaseFolders(value.docs.map((e) => {
        let val = e.data();
        val.id = e.id;
        return val;
      }));
    }
  }, [value]);

  let folders;
  if (LOCALMODE) {
    let foldersObj = data["teams"][currentTeam]["folders"];
    folders = Object.keys(foldersObj);
  }

  useEffect(() => {
    let newList = [];
    if (!value) {
      return;
    }
    for(let folder of value.docs) {
      if (folder.data().name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
        let newItem = folder.data();
        newItem.id = folder.id;
        newList.push(newItem);
      }
    }
    setFirebaseFolders(newList);
  }, [searchValue]);

  const sortAZ = () => {
    let fbFolders = [...firebaseFolders];
    fbFolders.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });
    setFirebaseFolders(fbFolders);
  }


  return (
    <TeamContainer>
      <HeaderRow>
        <Title>Team Folders</Title>
        <div>
          <Input placeholder="Search for teams" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
          <FilterButton color="primary" onClick={sortAZ}>Sort A-Z</FilterButton>
        </div>
      </HeaderRow>
      {LOCALMODE ? (
      <BoardContainer>
        {folders.map((folder, i) => 
          <Folder key={i}>
            <BoardLink folder={folder} data={data} setCurrentFolder={setCurrentFolder} currentTeam={currentTeam} />
          </Folder>
        )}
      </BoardContainer>
      ) : (
      <BoardContainer>
        <AddCard onClick={() => setModalOpen(true)}>
          <div>
            <AddText style={{ fontSize: '64px' }}>+</AddText>
            <AddText>Add a Team</AddText>
          </div>
        </AddCard>
        {firebaseFolders && firebaseFolders.map((folder, i) => (
          <FirebaseBoardLink id={folder.id} folder={folder} setCurrentFolder={setCurrentFolder} deleteFolder={deleteFolder} />
        ))}
      </BoardContainer>
      )}
    </TeamContainer>
  )
}

const BoardLink = ({ folder, data, currentTeam, setCurrentFolder }) => {
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

const FirebaseBoardLink = ({ id, folder, setCurrentFolder, deleteFolder }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const handleOnClick = (event) => {
    event.stopPropagation()
    setDeleteModalOpen(true)
  }
  
  return (              
    <Folder       
      to='/folder'
      onClick={() => setCurrentFolder(id)}
    >
      <OverlayContainer>
        <TrashIcon onClick={(event) => handleOnClick(event)} src={Trashcan} />
        <Circle>
          <Icon src={FolderIcon} />
        </Circle>
        <FolderName>{folder.name}</FolderName>
        <Description>{`${folder.links.length} Files`}</Description>
      </OverlayContainer>
      <ReactModal isOpen={deleteModalOpen} className="Modal" >
        <DeleteModalContent 
          setModalOpen={setDeleteModalOpen} 
          deleteFunction={deleteFolder}
          id={folder.id}
          labelName="Delete Folder?"
        />
      </ReactModal>
    </Folder>
  )
}

const Folder = styled(Link)`
  width: 22%;
  margin-right: 3%;
  height: auto;
  background-color: #FCEBE2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`

const FolderName = styled.h2`
  margin-top: 20px;
  font-weight: 600;
  font-size: 22px;
  text-align: center;
  color: black;
`

const TeamContainer = styled.div`
  margin-top: 50px;
`

const BoardContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
`

const NavLink = styled(Link)`
  width: 46%;
  height: 375px;
` 

const TrashIcon = styled.img`
  position: absolute;
  top: 0;
  right: 10px;
  height: 30px;
  width: 30px;
  cursor: pointer;
`

const AddCard = styled.div`
  width: 22%;
  margin-right: 3%;
  height: 200px;
  border: 2px solid #F7985A;
  border-radius: 15px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
`

const AddText = styled.p`
  width: 100%;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: #F7985A;
  text-align: center;
`

const Circle = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50px;
  margin: 0 auto;
  background: #F7985A;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled.img`
  width: 40px;
  height: 40px;
`

const Description = styled.p`
  font-size: 14px;
  color: #757575;
  text-align: center;
`