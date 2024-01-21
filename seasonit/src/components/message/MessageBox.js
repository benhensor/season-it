import React, { useState, useEffect } from 'react'
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
  margin: 0.5rem 0;
  z-index: 2;
`

const Message = styled.div`
  align-content: left;
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`

const Button = styled.button`
  border: none;
  background-color: transparent;
  text-wrap: nowrap;
  color: #b8b8b8;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.05s ease-in-out;
  ${({$id}) => $id === 'clear' && `
    &:hover {
      color: #FF0000;
    }
  `}
  ${({$id}) => ($id === 'fruit' || $id === 'veg') && `
  &:hover {
      color: #FFFFFF;
  }
  &:active {
      color: #2cff02;
  }
`}
  ${({$active}) => $active && `
    color: #2cff02;
    &:hover {
      color: #2cff02;
    }
  `}
`

const Divider = styled.span`
  font-size: 1.4rem;
  font-weight: 300;
  color: #b8b8b8;
  cursor: pointer;
  margin: 0 0.5rem;
  transition: all 0.05s ease-in-out;
`

function MessageBox({ month, message, setMessage, display, setFilteredProduceType, placeholder, reset }) {

  const { clearShoppingList } = useShoppingList()

  const [active, setActive] = useState(null)

  useEffect(() => {
    if (message.type === 'default' || message.type === 'current' || message.type === 'month') {
      setActive(null)
    }
  }, [message])

  function handleClick(produceType) {
    const fruitOrVeg = produceType === 'fruit' ? 'Fruits' : 'Vegetables'
    if (active === produceType) {
      setActive(null)
      setMessage(<Messages type='month' selectedMonth={month} />)
      setFilteredProduceType(null)
    } else {
      setMessage(<Messages type='filter' produceType={fruitOrVeg} selectedMonth={month} />)
      setActive(produceType)
      setFilteredProduceType(produceType)
    }
    
  }


  function handleClear() {
    clearShoppingList()
    setMessage(<Messages type='emptyList' />)
    setTimeout(() => {
      reset()
    }, 750)
    setActive(null)
  }


  return (
    <Container>
      <Message>{message}</Message>
      {!placeholder && (
        <>
          {!display ? (
            <Buttons>
              <Button 
                $id='fruit' 
                onClick={() => handleClick('fruit')}
                $active={active === 'fruit'}
              >
                Fruit
              </Button>
              <Divider>|</Divider>
              <Button 
                $id='veg' 
                onClick={() => handleClick('vegetable')}
                $active={active === 'vegetable'}
              >
                Veg
              </Button>
            </Buttons>
          ) : (      
            <Button $id='clear' onClick={() => handleClear()}>Clear List</Button>
          )}
        </>
      )}
    </Container>
  )
}

export default MessageBox