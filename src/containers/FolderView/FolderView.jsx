import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useDocument } from 'react-firebase-hooks/firestore';
import ControlContext from "shared/control-context";
import './FolderView.scss';
import { Title, Breadcrumbs, Input, FilterButton, SectionName, HeaderRow, ContentContainer, TrashIcon, PinIcon } from 'assets/StyledComponents/Shared'
import ReactModal from 'react-modal'

import LeftPanel from "containers/Panels/LeftPanel";
import { OverlayContainer } from 'assets/StyledComponents/Overlay'
import AddFileModal from 'containers/Modal/AddFileModal'
import DeleteModalContent from 'containers/Modal/DeleteModalContent'

import doc from 'assets/Landing/google-docs.png';
import sheet from 'assets/Landing/google-sheets.png';
import slides from 'assets/Landing/google-slides.png';
import drive from 'assets/Landing/google-drive.png';
import figma from 'assets/Landing/figma.png';
import link from 'assets/Landing/link.png';
import Trashcan from 'assets/Landing/delete.svg'
import Pin from 'assets/Landing/pin.svg'
import FilledPin from 'assets/Landing/filled-pin.svg'
import Pencil from 'assets/Landing/pencil.svg'
import { getFolderRef, getLinkData, getTeamRef, getLinkRef } from "shared/firebase";

import MoonLoader from "react-spinners/MoonLoader";

export default function FolderView () {
  const context = useContext(ControlContext);
  const { LOCALMODE, data, currentTeam, currentFolder, setCurrentLink } = context;
  const [firebaseLinks, setFirebaseLinks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [linkNamesToId, setLinkNamesToId] = useState([]);
  const [fileModalOpen, setFileModalOpen] = useState(false);

  let links;
  if (LOCALMODE) {
    links = data["teams"][currentTeam]["folders"][currentFolder]["links"];
  }

  const [folderDataDoc] = useDocument(
    getFolderRef(currentTeam, currentFolder),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (folderDataDoc) {
      setFirebaseLinks(folderDataDoc.data().links);

      async function getNewLinkNames() {
        let newLinkNamesToId = {};
        for (let linkId of folderDataDoc.data().links) {
          let linkName = await getLinkData(currentTeam, linkId);
          linkName = linkName.name;
          newLinkNamesToId[linkName] = linkId;
        }
        return newLinkNamesToId;
      }
      getNewLinkNames().then((result) => {
        setLinkNamesToId(result);
      })
    }
  }, [folderDataDoc]);

  const [teamDataDoc] = useDocument(
    getTeamRef(currentTeam),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    // console.log(context);
  })

  useEffect(() => {
    let newList = [];
    for(let [name, id] of Object.entries(linkNamesToId)) {
      if (name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
        newList.push(id);
      }
    }
    setFirebaseLinks(newList);
  }, [searchValue]);

  const sortAZ = async () => {
    let linkNames = Object.keys(linkNamesToId)
    linkNames.sort((a, b) => {
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      return 0;
    });
    setFirebaseLinks(linkNames.map((name) => linkNamesToId[name]));
  }

  const sortCreatedDate = async () => {
    let linkDatesToId = {};
    let linkDates = []
    for (let linkId of firebaseLinks) {
      let linkDate = await getLinkData(currentTeam,linkId);
     // firebase.firestore().collection("teams").doc(currentTeam).collection("links").doc(linkId).get();
      linkDate = linkDate.createdDate;
      linkDatesToId[linkDate] = linkId;
      linkDates.push(linkDate);
    }
    linkDates.sort();
    setFirebaseLinks(linkDates.map((date) => linkDatesToId[date]));
  }

  return (
    <Row>
      <LeftPanel />
      <ContentContainer>
        <Breadcrumbs>
          <NavLink to='/'>Teams</NavLink>
          <Arrow> &gt; </Arrow>
          <NavLink to='/team'>{teamDataDoc && teamDataDoc.data().name}</NavLink>
          <Arrow> &gt; </Arrow>
          <NavLink to='/folder'>{folderDataDoc && folderDataDoc.data().name}</NavLink>
        </Breadcrumbs>
        <HeaderRow>
          <Title>Files</Title>
          <div>
            <Input placeholder="Search for files" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            <FilterButton color="primary" onClick={sortAZ}>Sort A-Z</FilterButton>
          </div>
        </HeaderRow>
        <SectionName>Pinned Files</SectionName>
        <LinkListContainer>
          {LOCALMODE ? (
            <LinksList>
              {links.map((link) => 
                <GetLinks link={link} data={data} currentTeam={currentTeam} currentFolder={currentFolder} pinned={true} setCurrentLink={setCurrentLink} />
              )}
            </LinksList>
          ) : (
            <React.Fragment>
              {firebaseLinks && firebaseLinks.map((link, i) => (
                <GetFirebaseLinks key={i} pinned={true} link={link} currentTeam={currentTeam} currentFolder={currentFolder} setCurrentLink={setCurrentLink} />
              ))}
            </React.Fragment>
          )}
        </LinkListContainer>

        <LinkListContainer>
          <HeaderContainerWithDropdown>
            <SectionName>All Files</SectionName>
            {/* <FilesDropdown>
              <option value="Recently Viewed">Recently Viewed</option>
            </FilesDropdown> */}
          </HeaderContainerWithDropdown>
          <div className="FolderView__view_options">
            {/* <Button color="primary" onClick={sortAZ}>Sort A-Z</Button>
            <Button color="primary" onClick={sortCreatedDate}>Sort by Created Date</Button> */}
          </div>
          {LOCALMODE ? (
            <LinksList>
              {links.map((link) => 
                <GetLinks link={link} data={data} currentTeam={currentTeam} currentFolder={currentFolder} pinned={false} setCurrentLink={setCurrentLink} />
              )}
            </LinksList>
          ) : (
            <LinksList>
              <AddCard onClick={() => setFileModalOpen(true)}>
                <div>
                  <AddText style={{ fontSize: '64px' }}>+</AddText>
                  <AddText>Add a File</AddText>
                </div>
              </AddCard>
              {firebaseLinks && firebaseLinks.map((link, i) => (
                <GetFirebaseLinks key={i} pinned={false} link={link} currentTeam={currentTeam} currentFolder={currentFolder} setCurrentLink={setCurrentLink} />
              ))}
            </LinksList>
          )}
        </LinkListContainer>
      </ContentContainer>
      {/* <RightPanel page={"FolderView"} /> */}
      <ReactModal isOpen={fileModalOpen} className="Modal" >
          <AddFileModal 
            setModalOpen={setFileModalOpen} 
          />
        </ReactModal>
    </Row>
  )
}

const getIconType = type => {
  if (type === "googleDoc") return doc;
  if (type === "googleSheet") return sheet;
  if (type === "googleSlides") return slides;
  if (type === "drive") return drive;
  if (type === "figma") return figma;
  if (type === "resource") return link;
}

const GetFirebaseLinks = ({ link, currentTeam, setCurrentLink, pinned }) => {
  const { pinLink, deleteLink, updateLink } = useContext(ControlContext)
  const [modalOpen, setModalOpen] = useState(false)
  const [linkDataDoc] = useDocument(
    getLinkRef(currentTeam, link),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <React.Fragment>
      {linkDataDoc && linkDataDoc.data() && linkDataDoc.data().pinned === pinned && !linkDataDoc.data().url &&
        <DisabledLinkContainer>
          <MoonLoader
            size={50}
            color={"#123abc"}
          />
          <LinkContainerTitle>{linkDataDoc.data().name}</LinkContainerTitle>
        </DisabledLinkContainer>
      }
      {linkDataDoc && linkDataDoc.data() && linkDataDoc.data().pinned === pinned && linkDataDoc.data().url &&
        <LinkContainer>
          <OverlayContainer>

            <TrashIcon src={Trashcan} onClick={() => setModalOpen(true)} />
            <PinIcon src={pinned ? FilledPin : Pin} onClick={() => updateLink(linkDataDoc.id, {"pinned":!pinned})} />
            <Circle>
              <Icon src={getIconType(linkDataDoc.data().linkType)} />
            </Circle>
            <LinkContainerTitle>
              <Link to="/shared-desktop" onClick={() => setCurrentLink(linkDataDoc.id)}>
                {linkDataDoc.data().name}
              </Link>
              <EditIcon src={Pencil} onClick={() => updateLink(link)} />
            </LinkContainerTitle>
          </OverlayContainer>
          <ReactModal isOpen={modalOpen} className="Modal" >
            <DeleteModalContent 
              setModalOpen={setModalOpen} 
              deleteFunction={deleteLink}
              id={linkDataDoc && linkDataDoc.id}
              labelName="Delete Link?"
            />
          </ReactModal>
        </LinkContainer>
      }
    </React.Fragment>
    // <div>
    //   {value && value.data().pinned === pinned && value.data().linkType !== "resource" &&
    //     <LinkContainer to="/shared-desktop" onClick={() => setCurrentLink(value.id)}>
    //       <LinkContainerType src={getIconType(value.data().linkType)}></LinkContainerType>
    //       <LinkContainerTitle>{value.data().name}</LinkContainerTitle>
    //     </LinkContainer>
    //   }

    //   {value && value.data().pinned === pinned && value.data().linkType === "resource" &&
    //     <WebLinkContainer href={value.data().link} target="_blank">
    //       <LinkContainerType src={getIconType(value.data().linkType)}></LinkContainerType>
    //       <LinkContainerTitle>{value.data().name}</LinkContainerTitle>
    //     </WebLinkContainer>
    //   }
    // </div>
  )
}

const GetLinks = ({link, data, currentTeam, pinned, setCurrentLink}) => {
  let item = data["teams"][currentTeam]["links"][link];
  // console.log(item.pinned === pinned && item.linkType !== "resource")

  return (
    <React.Fragment>
      {item && item.pinned === pinned &&
        <LinkContainer to="/shared-desktop" onClick={() => setCurrentLink(link)}>
          <Circle>
            <Icon src={getIconType(item.linkType)} />
          </Circle>
          {/* <LinkContainerType src={getIconType(item.linkType)}></LinkContainerType> */}
          <LinkContainerTitle>{item.name}</LinkContainerTitle>
        </LinkContainer>
      }
    </React.Fragment>
    // <div>
    //   {item && item.pinned === pinned && item.linkType !== "resource" &&
    //     <LinkContainer to="/shared-desktop" onClick={() => setCurrentLink(link)}>
    //       <LinkContainerType src={getIconType(item.linkType)}></LinkContainerType>
    //       <LinkContainerTitle>{item.name}</LinkContainerTitle>
    //     </LinkContainer>
    //   }

    //   {item && item.pinned === pinned && item.linkType === "resource" &&
    //     <WebLinkContainer href={item.link} target="_blank">
    //       <LinkContainerType src={getIconType(item.linkType)}></LinkContainerType>
    //       <LinkContainerTitle>{item.name}</LinkContainerTitle>
    //     </WebLinkContainer>
    //   }
    // </div>
  )
}

const Row = styled.div`
  display: flex;
  width: 100%;
`

const LinkListContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  width:100%;
`

const LinksList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
  width: 100%;
`

const DisabledLinkContainer = styled.div`
  width: 17%;
  height: 180px;
  margin-right: 3%;
  margin-bottom: 20px;
  display: flex;
  background: #F7ECFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`

const LinkContainer = styled.div`
  width: 17%;
  height: 180px;
  margin-right: 3%;
  margin-bottom: 20px;
  background: #F7ECFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`

const Circle = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50px;
  margin: 0 auto;
  margin-top: 20px;
  background: #BE83FF;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled.img`
  width: 30px;
  height: 30px;
`

const LinkContainerTitle = styled.div`
  margin-top: 10px;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  color: black;
`

const HeaderContainerWithDropdown = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const Arrow = styled.p`
  margin: 0 10px 0 10px;
`

const AddCard = styled.div`
  width: 17%;
  height: 180px;
  border: 2px solid #BE83FF;
  border-radius: 15px;
  margin-right: 3%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
`

const AddText = styled.p`
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  color: #BE83FF;
  text-align: center;
  margin-bottom: 0;
`

const EditIcon = styled.img`
  width: 17px;
  height: 17px;
  margin-left: 12px;
  cursor: pointer;
`

// const LinkContainerType = styled.img`
//   height: 50%;
// `

// const FilesDropdown = styled.select`
//   width: 200px;
//   height: 50px;
//   font-size: 18px;
//   align-self: center;
//   margin-left: auto;
//   -webkit-appearance: menulist-button;
// `

// const WebLinkContainer = styled.a`
//   height: 160px;
//   width: 120px;
//   background-color: #c4c4c4;
//   margin-right: 40px;
//   margin-top: 40px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `