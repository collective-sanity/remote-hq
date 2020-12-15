import React, { useState, useContext } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'

import doc from 'assets/Landing/google-docs.png'
import sheet from 'assets/Landing/google-sheets.png'
import slides from 'assets/Landing/google-slides.png'
import figma from 'assets/Landing/figma.png'
import link from 'assets/Landing/link.png'

export default function AddFileModal ({ setModalOpen, labelName, submitName }) {
  const { createLink } = useContext(ControlContext);
  const [name, setName] = useState("")
  const [webUrl, setWebUrl] = useState("")
  const [fileType, setFileType] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault();
    createLink(fileType, name, webUrl)
    setModalOpen(false)
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <X onClick={() => setModalOpen(false)}>X</X>
        <Title>Add a New File</Title>
        <Label>
          <SectionTitle>Name:</SectionTitle>
          <Input 
            type="text" 
            name="Name" 
            placeholder="New File Name"
            onChange={event => setName(event.target.value)} 
          />
        </Label>
        <SectionTitle>File Type:</SectionTitle>
        <IconRow>
          <IconContainer 
            onClick={() => setFileType('googleDoc')}
            selected={fileType === 'googleDoc'}
          >
            <Icon src={doc} />
          </IconContainer>
          <IconContainer 
            onClick={() => setFileType('googleSheet')} 
            selected={fileType === 'googleSheet'}
          >
            <Icon src={sheet} />
          </IconContainer>
          <IconContainer 
            onClick={() => setFileType('googleSlides')}
            selected={fileType === 'googleSlides'}
          >
            <Icon src={slides} />
          </IconContainer>
          <IconContainer 
            onClick={() => setFileType('figma')}
            selected={fileType === 'figma'}
          >
            <Icon src={figma} />
          </IconContainer>
          <IconContainer 
            onClick={() => setFileType('resource')}
            selected={fileType === 'resource'}
          >
            <Icon src={link} />
          </IconContainer>
        </IconRow>
        {(fileType === 'figma' || fileType === 'resource') &&
          <React.Fragment>
            <SectionTitle>File Type:</SectionTitle>
            <Label>
              <Input 
                type="text" 
                placeholder="Website URL"
                name="URL" 
                onChange={event => setWebUrl(event.target.value)} 
              />
            </Label>
          </React.Fragment>
        }
        <BtnRow>
          <CancelBtn onClick={() => setModalOpen(false)}>Cancel</CancelBtn>
          <SubmitBtn type="submit" value='Create' />
        </BtnRow>
      </form>
    </div>
  )
}

const CancelBtn = styled.button`
  border: 1px solid black;
  background white;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 20px;
  width: 35%;
  color: #BE83FF;
  border: 1px solid #BE83FF;
`

const SubmitBtn = styled.input`
  border: 1px solid black; 
  border-radius: 5px;
  padding: 5px 10px;
  background: #BE83FF;
  color: white;
  width: 60%;
  border: none;
`

const BtnRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

const IconRow = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const IconContainer = styled.div`
  width: 16%;
  height: auto;
  padding: 10px 25px;
  display: flex;
  justify-content: center;
  border-radius: 15px;
  border: ${props => props.selected ? '1px solid #BE83FF' : 'none'};
  cursor: pointer;
`

const Icon = styled.img`
  width: 50px;
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`

const X = styled.p`
  float: right;
  font-weight: bold;
  margin-left: 40px;
  cursor: pointer;
`

const Input = styled.input`
  width: 100%;
  font-size: 18px;
  border-radius: 10px;
  border: 1px solid #5C677D;
  padding: 10px 10px;
  margin-bottom: 15px;
`

const SectionTitle = styled.p`
  font-size: 14px;
  line-height: 22px;
  color: #9B9B9B;
`

const Label = styled.label`
  width: 100%;
`