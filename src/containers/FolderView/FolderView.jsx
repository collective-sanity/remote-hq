import React from "react"
import styled from "styled-components"
import { NavLink } from 'react-router-dom'

export default function FolderView () {
  return (
    <Row>
      <Links>
        <Breadcrumbs>{`MHCI > SSUI > Chatbot`}</Breadcrumbs>
        <LinkListContainer>
          <LinkListContainerTitle>Pinned Files</LinkListContainerTitle>
          <LinksList>
            <NavLink to='/shared-desktop'><Link /></NavLink>
            <NavLink to='/shared-desktop'><Link /></NavLink>
            <NavLink to='/shared-desktop'><Link /></NavLink>
            <NavLink to='/shared-desktop'><Link /></NavLink>
            <NavLink to='/shared-desktop'><Link /></NavLink>
            <NavLink to='/shared-desktop'><Link /></NavLink>
            <NavLink to='/shared-desktop'><Link /></NavLink>
            <NavLink to='/shared-desktop'><Link /></NavLink>
            <NavLink to='/shared-desktop'><Link /></NavLink>
            <NavLink to='/shared-desktop'><Link /></NavLink>
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
            <NavLink to='/shared-desktop'><Link /></NavLink>
            <NavLink to='/shared-desktop'><Link /></NavLink>
            <NavLink to='/shared-desktop'><Link /></NavLink>
            <NavLink to='/shared-desktop'><Link /></NavLink>
            <NavLink to='/shared-desktop'><Link /></NavLink>
            <NavLink to='/shared-desktop'><Link /></NavLink>
            <NavLink to='/shared-desktop'><Link /></NavLink>
            <NavLink to='/shared-desktop'><Link /></NavLink>
            <NavLink to='/shared-desktop'><Link /></NavLink>
            <NavLink to='/shared-desktop'><Link /></NavLink>
          </LinksList>
        </LinkListContainer>
      </Links>
    </Row>
  )
}


const Row = styled.div`
  display: flex;
  justify-content: space-between;
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

const Link = styled.div`
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