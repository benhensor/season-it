import React from 'react'
import styled from 'styled-components'
import { useShoppingList } from '../../context/ShoppingListContext'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #21241f;
  padding: 0 1rem;
  z-index: 2;
`

const MessageH1 = styled.h1`
  text-align: left;
  height: 4.3rem;
  font-size: 1.2rem;
  font-weight: 300;
  padding: 1rem 0;
  color: #eee;
`

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: #b8b8b8;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.05s ease-in-out;
  &:hover {
    color: #FF0000;
  }
`

function Message({ message, setMessage, display, clearList }) {

  const { shoppingList, clearShoppingList } = useShoppingList()

  function handleClear() {
    clearShoppingList()
    setMessage('Shopping list is empty')
    setTimeout(() => {
      clearList()
    }, 500)
  }

  return (
    <Container>
      <MessageH1>{message}</MessageH1>
      {(display && shoppingList.length !== 0) && (
        <Button onClick={() => handleClear()}>Clear List</Button>
      )}
    </Container>
  )
}

export default Message