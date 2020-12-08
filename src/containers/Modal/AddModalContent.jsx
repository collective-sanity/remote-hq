import React, { useState } from "react"
import styled from "styled-components"

export default function AddModalContent ({ setModalOpen, createFunction, labelName, submitName }) {
  const [name, setName] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    createFunction(name)
    setModalOpen(false)
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <X onClick={() => setModalOpen(false)}>X</X>
        <label>
          <Title>{labelName}:</Title>
          <input 
            type="text" 
            name="name" 
            onChange={event => setName(event.target.value)} 
          />
        </label>
        <BtnRow>
          <CancelBtn onClick={() => setModalOpen(false)}>Cancel</CancelBtn>
          <SubmitBtn type="submit" value={submitName} />
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
`

const SubmitBtn = styled.input`
  border: 1px solid black; 
  border-radius: 5px;
  padding: 5px 10px;
`

const BtnRow = styled.div`
  display: flex;
  margin-top: 20px;
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