import React from "react"
import styled from "styled-components"

export default function DeleteModalContent ({ setModalOpen, deleteFunction, labelName, id }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    deleteFunction(id)
    setModalOpen(false)
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <X onClick={() => setModalOpen(false)}>X</X>
        <Title>{labelName}:</Title>
        <p>This action will permanently delete everything, including nested data.</p>
        <BtnRow>
          <CancelBtn onClick={() => setModalOpen(false)}>Cancel</CancelBtn>
          <Delete type="submit" value="Delete" />
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

const Delete = styled.input`
  border: none;
  background: red;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
`

const BtnRow = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
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