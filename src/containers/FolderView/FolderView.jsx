import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import firebase from 'firebase/app';
import { useDocument } from 'react-firebase-hooks/firestore';
import ControlContext from "shared/control-context";
import { Button } from 'reactstrap';

import LeftPanel from "containers/Panels/LeftPanel";
import RightPanel from "containers/Panels/RightPanel";

import doc from 'assets/Landing/google-docs.png';
import sheet from 'assets/Landing/google-sheets.png';
import slides from 'assets/Landing/google-slides.png';
import drive from 'assets/Landing/google-drive.png';
import figma from 'assets/Landing/figma.png';
import link from 'assets/Landing/link.png';

export default function FolderView () {
  const context = useContext(ControlContext);
  const { LOCALMODE, data, currentTeam, currentFolder, setCurrentLink } = context;
  const [firebaseLinks, setFirebaseLinks] = useState([]);

  let links;
  if (LOCALMODE) {
    links = data["teams"][currentTeam]["folders"][currentFolder]["links"];
  }

  const [value] = useDocument(
    firebase.firestore().collection("teams").doc(currentTeam.trim()).collection("folders").doc(currentFolder),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (value) {
      setFirebaseLinks(value.data().links);
    }
  }, [value]);

  const [teamName] = useDocument(
    firebase.firestore().doc(`teams/${currentTeam.trim()}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    // console.log(context);
  })

  const sortAZ = async () => {
    let linkNamesToId = {};
    let linkNames = []
    for (let linkId of firebaseLinks) {
      let linkName = await firebase.firestore().collection("teams").doc(currentTeam).collection("links").doc(linkId).get();
      linkName = linkName.data().name;
      linkNamesToId[linkName] = linkId;
      linkNames.push(linkName);
    }
    linkNames.sort();
    setFirebaseLinks(linkNames.map((name) => linkNamesToId[name]));
  }

  const sortCreatedDate = async () => {
    let linkDatesToId = {};
    let linkDates = []
    for (let linkId of firebaseLinks) {
      let linkDate = await firebase.firestore().collection("teams").doc(currentTeam).collection("links").doc(linkId).get();
      linkDate = linkDate.data().createdDate;
      linkDatesToId[linkDate] = linkId;
      linkDates.push(linkDate);
    }
    linkDates.sort();
    setFirebaseLinks(linkDates.map((date) => linkDatesToId[date]));
  }

  return (
    <Row>
      <LeftPanel />
      <Links>
        <Breadcrumbs>
          <NavLink to='/'>Teams</NavLink>
          <Arrow> &gt; </Arrow>
          <NavLink to='/team'>{teamName && teamName.data().name}</NavLink>
          <Arrow> &gt; </Arrow>
          <NavLink to='/folder'>{value && value.data().name}</NavLink>
        </Breadcrumbs>
        <LinkListContainer>
          <LinkListContainerTitle>Pinned Files</LinkListContainerTitle>
          {LOCALMODE ? (
            <LinksList>
              {links.map((link) => 
                <GetLinks link={link} data={data} currentTeam={currentTeam} currentFolder={currentFolder} pinned={true} setCurrentLink={setCurrentLink} />
              )}
            </LinksList>
          ) : (
            <LinksList>
            {firebaseLinks && firebaseLinks.map((link, i) => (
              <GetFirebaseLinks key={i} pinned={true} link={link} currentTeam={currentTeam} currentFolder={currentFolder} setCurrentLink={setCurrentLink} />
            ))}
            </LinksList>
          )}
        </LinkListContainer>

        <LinkListContainer>
          <HeaderContainerWithDropdown>
            <LinkListContainerTitle>All Files</LinkListContainerTitle>
            {/* <FilesDropdown>
              <option value="Recently Viewed">Recently Viewed</option>
            </FilesDropdown> */}
          </HeaderContainerWithDropdown>
          <Button color="primary" onClick={sortAZ}>Sort A-Z</Button>
          <Button color="primary" onClick={sortCreatedDate}>Sort by Created Date</Button>
          {LOCALMODE ? (
            <LinksList>
              {links.map((link) => 
                <GetLinks link={link} data={data} currentTeam={currentTeam} currentFolder={currentFolder} pinned={false} setCurrentLink={setCurrentLink} />
              )}
            </LinksList>
          ) : (
            <LinksList>
            {firebaseLinks && firebaseLinks.map((link, i) => (
              <GetFirebaseLinks key={i} pinned={false} link={link} currentTeam={currentTeam} currentFolder={currentFolder} setCurrentLink={setCurrentLink} />
            ))}
            </LinksList>
          )}
        </LinkListContainer>
      </Links>
      <RightPanel page={"FolderView"} />
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
  const [value] = useDocument(
    firebase.firestore().collection("teams").doc(currentTeam).collection("links").doc(link),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      {value && value.data().pinned === pinned &&
        <LinkContainer to="/shared-desktop" onClick={() => setCurrentLink(value.id)}>
          <LinkContainerType src={getIconType(value.data().linkType)}></LinkContainerType>
          <LinkContainerTitle>{value.data().name}</LinkContainerTitle>
        </LinkContainer>
      }
    </div>
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
    <div>
      {item && item.pinned === pinned &&
        <LinkContainer to="/shared-desktop" onClick={() => setCurrentLink(link)}>
          <LinkContainerType src={getIconType(item.linkType)}></LinkContainerType>
          <LinkContainerTitle>{item.name}</LinkContainerTitle>
        </LinkContainer>
      }
    </div>
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

const Links = styled.div`
    width: 100%;
    height: 100vh;
    overflow: auto;
    display: flex;
    flex: 1;
    justify-content: flex-start;
    flex-direction: column;
    padding: 3vw;
`

const Breadcrumbs = styled.div`
  font-size: 24px;
  margin-bottom: 30px;
  display: flex;
`

const LinkListContainer = styled.div`
  margin-bottom: 30px;

`

const LinkListContainerTitle = styled.div`
  font-size: 36px;
`

const LinksList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const LinkContainer = styled(Link)`
  height: 160px;
  width: 120px;
  background-color: #c4c4c4;
  margin-right: 40px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const WebLinkContainer = styled.a`
  height: 160px;
  width: 120px;
  background-color: #c4c4c4;
  margin-right: 40px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const LinkContainerType = styled.img`
  height: 50%;
`

const LinkContainerTitle = styled.div`
  font-size: 18px;
`

const HeaderContainerWithDropdown = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const Arrow = styled.p`
  margin: 0 10px 0 10px;
`

// const FilesDropdown = styled.select`
//   width: 200px;
//   height: 50px;
//   font-size: 18px;
//   align-self: center;
//   margin-left: auto;
//   -webkit-appearance: menulist-button;
// `