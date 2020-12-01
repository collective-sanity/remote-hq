import React, { useContext } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'
import GoogleLogo from '../../assets/google-logo.png'

const Title = styled.h1`
  font-size: 72px;
  text-align: center;
  font-weight: 300;
  margin-top: 15vh;
`

const Subtitle = styled.h4`
  margin-top: 20px;
  font-size: 28px;
  text-align: center;
  font-weight: 300;
`

const Button = styled.button`
  font-size: 18px;
  padding: 20px 20px;
  margin: 40vh auto 0 auto;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
`

const Img = styled.img`
  width: 30px;
  height: auto;
  margin-right: 10px;
`

export default function Splash () {
  const {
    loginUser,
  } = useContext(ControlContext);
  
  return (
    <div id="LoginPage-container">
      <Title>Remote<b>HQ</b></Title>
      <Subtitle>Virtual Collaboration Made Easy</Subtitle>
      <Button id="LoginPage-login-button" onClick={() => loginUser()}>
        <Img src={GoogleLogo} />
        Sign In with Google
      </Button>
    </div>
  )
}