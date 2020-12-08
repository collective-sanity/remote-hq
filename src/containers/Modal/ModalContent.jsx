import React, { useState } from "react"

export default function ModalContent ({ setModalOpen, createFunction, labelName }) {
  const [name, setName] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    createFunction(name)
    setModalOpen(false)
  }
  
  return (
    <div>
      <p onClick={() => setModalOpen(false)}>X</p>
      <p>Modal Content</p>
      <form onSubmit={handleSubmit} >
        <label>
          {labelName}
          <input 
            type="text" 
            name="name" 
            onChange={event => setName(event.target.value)} 
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}