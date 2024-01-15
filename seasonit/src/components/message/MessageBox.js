import React from 'react'
import styled from 'styled-components'
import { useShoppingList } from '../../context/ShoppingListContext'
import { Messages } from '../messages/Messages'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #21241f;
  padding: 0 1rem;
  z-index: 2;
`

const Message = styled.div`
  align-content: left;
`

const Button = styled.button`
  border: none;
  background-color: transparent;
  text-wrap: nowrap;
  color: #b8b8b8;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.05s ease-in-out;
  &:hover {
    color: #FF0000;
  }
`

function MessageBox({ message, setMessage, display, reset }) {

  const { shoppingList, clearShoppingList } = useShoppingList()

  function handleClear() {
    clearShoppingList()
    setMessage(<Messages type='emptyList' />)
    setTimeout(() => {
      reset()
    }, 750)
  }

  return (
    <Container>
      <Message>{message}</Message>
      {(display && shoppingList.length !== 0) && (
        <Button onClick={() => handleClear()}>Clear List</Button>
      )}
    </Container>
  )
}

export default MessageBox