import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom";
import styled from "styled-components";

import doc from '../../assets/Landing/google-docs.png';
import sheet from '../../assets/Landing/google-sheets.png';
import slides from '../../assets/Landing/google-slides.png';
import figma from '../../assets/Landing/figma.png';
import ControlContext from "shared/control-context";
import LeftPanel from "containers/Panels/LeftPanel";
import RightPanel from "containers/Panels/RightPanel";

// TODO: create file
// TODO: create link
// TODO: edit folder name
// TODO: delete folder
export default function FolderView () {
  const context = useContext(ControlContext);
  const { currentRoom, currentFolder, setCurrentLink } = context;

  // context.currentFolder.links
  const links = [
    {
      title: "meep",
      link: "https://docs.google.com/document/d/19R4d_-EHnhiGkq2x9iUOYZttT3aflE8fzbZB4J7ZOh4/",
      type: "doc"
    },
    {
      title: "beep",
      link: "https://docs.google.com/spreadsheets/d/1QgJwm8rLpO70HNxzvzGGRhmskoYSe7MQhhsWrYiICgQ/",
      type: "sheet"
    },
    {
      title: "meow",
      link: "https://docs.google.com/presentation/d/1u1dJoPthkIsEa_IAIrLYTvQRk6MYtzw6YCvRL1cL3xk/",
      type: "slides"
    },
    {
      title: "test",
      link: "https://www.figma.com/file/jSPgLf0DbOKa9bdztdMngs/Mobile?node-id=0%3A1",
      type: "figma"
    },
  ];
  
  const getIconType = type => {
    if (type === "doc") return doc;
    if (type === "sheet") return sheet;
    if (type === "slides") return slides;
    if (type === "figma") return figma;
  }

  useEffect(() => {
    console.log(context);
  })
  
  return (
    
    <Row>
      <LeftPanel />
      <Links>
        <Breadcrumbs>{currentRoom} {'>'} {currentFolder}</Breadcrumbs>
        <LinkListContainer>
          <LinkListContainerTitle>Pinned Files</LinkListContainerTitle>
          <LinksList>
            {links.map((link) => 
              <LinkContainer to="/shared-desktop" onClick={() => setCurrentLink(link)}>
                <LinkContainerType src={getIconType(link.type)}></LinkContainerType>
                <LinkContainerTitle>{link.title}</LinkContainerTitle>
              </LinkContainer>
            )}
          </LinksList>
        </LinkListContainer>

        <LinkListContainer>
          <HeaderContainerWithDropdown>
            <LinkListContainerTitle>All Files</LinkListContainerTitle>
            <FilesDropdown>
              <option value="Recently Viewed">Recently Viewed</option>
            </FilesDropdown>
          </HeaderContainerWithDropdown>
          <LinksList>
            {links.map((link) => <LinkContainer 
              to={{
                pathname: '/shared-desktop',
                state: {
                  link: link.link,
                  type: link.type
                }
              }}>
                <LinkContainerType src={getIconType(link.type)}></LinkContainerType>
                <LinkContainerTitle>{link.title}</LinkContainerTitle>
              </LinkContainer>
            )}
          </LinksList>
        </LinkListContainer>
      </Links>
      <RightPanel page={"FolderView"} />
    </Row>
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

const FilesDropdown = styled.select`
  width: 200px;
  height: 50px;
  font-size: 18px;
  align-self: center;
  margin-left: auto;
  -webkit-appearance: menulist-button;
`