import React, { useContext } from "react"
import { Link } from "react-router-dom";
import styled from "styled-components"
import ControlContext from '../../shared/control-context'

import LeftPanel from "containers/Panels/LeftPanel"
import RightPanel from "containers/Panels/RightPanel"

// TODO: dynamic lists
// TODO: icon based on type
// TODO: filename
// TODO: iframe + pointer-events: none;
// TODO: breadcrumbs

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

const Links = styled.div`
    width: 85%;
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

const links = [
  {
    title: "meep",
    link: "https://docs.google.com/document/d/19R4d_-EHnhiGkq2x9iUOYZttT3aflE8fzbZB4J7ZOh4/",
    type: "doc"
  },
];

export default function FolderView () {
    return (
      <Row>
        <LeftPanel />

        <Links>
          <Breadcrumbs>MHCI > SSUI > Chatbot</Breadcrumbs>
          <LinkListContainer>
            <LinkListContainerTitle>Pinned Files</LinkListContainerTitle>
            <LinksList>
              {links.map((link) => <LinkContainer 
                to={{
                  pathname: '/shared-desktop',
                  state: {
                    link: link.link,
                    type: link.type
                  }
                }} />
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

            </LinksList>
          </LinkListContainer>
        </Links>

        <RightPanel />
      </Row>
    )
  }