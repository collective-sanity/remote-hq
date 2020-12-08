import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import firebase from 'firebase/app';
import { useDocument } from 'react-firebase-hooks/firestore';
import ControlContext from "shared/control-context";

// import LeftPanel from "containers/Panels/LeftPanel";
import RightPanel from "containers/Panels/RightPanel";

import doc from '../../assets/Landing/google-docs.png';
import sheet from '../../assets/Landing/google-sheets.png';
import slides from '../../assets/Landing/google-slides.png';
import drive from '../../assets/Landing/google-drive.png';
import figma from '../../assets/Landing/figma.png';

// TODO: open gdrive and web links in new tab
// TODO: pinned files
// TODO: link icon
// TODO: breadcrumbs
export default function FolderView () {
  const context = useContext(ControlContext);
  const { LOCALMODE, data, currentTeam, currentFolder, setCurrentLink } = context;
  // console.log(currentFolder)

  let links;
  if (LOCALMODE) {
    links = data["teams"][currentTeam]["folders"][currentFolder]["links"];
  }

  const [value] = useDocument(
    firebase.firestore().collection("teams").doc(currentTeam).collection("folders").doc(currentFolder),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    // console.log(context);
  })

  const getLinks = (link, data, currentTeam, currentFolder) => {
    let item = data["teams"][currentTeam]["links"][link];

    return (
      <LinkContainer to="/shared-desktop" onClick={() => setCurrentLink(link)}>
        <LinkContainerType src={getIconType(item.linkType)}></LinkContainerType>
        <LinkContainerTitle>{item.name}</LinkContainerTitle>
      </LinkContainer>
      // <LinkContainer href={item.link} target="_blank">
      //   <LinkContainerType src={getIconType(item.linkType)}></LinkContainerType>
      //   <LinkContainerTitle>{item.name}</LinkContainerTitle>
      // </LinkContainer>
    )
  }

  return (
    <Row>
      {/* <LeftPanel /> */}
      <Links>
        <Breadcrumbs>{currentTeam.name} {'>'} {currentFolder.name}</Breadcrumbs>
        <LinkListContainer>
          <LinkListContainerTitle>Pinned Files</LinkListContainerTitle>
          {LOCALMODE ? (
            <LinksList>
              {links.map((link) => 
                getLinks(link, data, currentTeam, currentFolder)
              )}
            </LinksList>
          ) : (
            <LinksList>
            {value && value.data().links.map((link, i) => (
              <GetFirebaseLinks link={link} currentTeam={currentTeam} currentFolder={currentFolder} setCurrentLink={setCurrentLink} />
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
          <LinksList>
          </LinksList>
        </LinkListContainer>
      </Links>
      <RightPanel page={"FolderView"} />
    </Row>
  )
}

const getIconType = type => {
  if (type === "googledoc") return doc;
  if (type === "googlesheet") return sheet;
  if (type === "googleslides") return slides;
  if (type === "drive") return drive;
  if (type === "figma") return figma;
}

const GetFirebaseLinks = ({ link, currentTeam, currentFolder, setCurrentLink }) => {
  const [value] = useDocument(
    firebase.firestore().collection("teams").doc(currentTeam).collection("links").doc(link),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      {/* {value && <span>Document: {JSON.stringify(value.data())}</span>} */}
      {value && 
        <LinkContainer to="/shared-desktop" onClick={() => setCurrentLink(value.id)}>
          <LinkContainerType src={getIconType(value.data().linkType)}></LinkContainerType>
          <LinkContainerTitle>{value.data().name}</LinkContainerTitle>
        </LinkContainer>
      }

      {/* <LinkContainer href={item.link} target="_blank">
        <LinkContainerType src={getIconType(item.linkType)}></LinkContainerType>
        <LinkContainerTitle>{item.name}</LinkContainerTitle>
      </LinkContainer> */}
    </div>
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

// const FilesDropdown = styled.select`
//   width: 200px;
//   height: 50px;
//   font-size: 18px;
//   align-self: center;
//   margin-left: auto;
//   -webkit-appearance: menulist-button;
// `