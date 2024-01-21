import React from 'react'
import styled from 'styled-components'
import { useShoppingList } from '../../context/ShoppingListContext'

const Container = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: #3A452A;
  color: #EEE;
  border-bottom: 1px solid #77777730;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #2F3822;
    img {
      border: 2px solid #2cff02;
    }
  }
  ${({$isMarked}) => $isMarked && `
    img {
      border: 2px solid #2cff02;
    }
    p {
      text-decoration: 2px line-through;
      text-decoration-color: #2cff02;
    }
  `}
`

const ShoppingImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    border: 2px solid #2d5e23;
    transition: all 0.2s ease-in-out;
  }
`

const ShoppingText = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;  
`

const ProduceName = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
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
  transition: all 0.05s ease-in-out;
  ${({$id}) => $id === 'mark' && `
    &:hover {
      color: #FFFFFF;
    }
  `}
  ${({$id}) => $id === 'remove' && `
    &:hover {
      color: #FF0000;
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

export function ShoppingCard({ listing, removeItem }) {

  const { toggleMarked } = useShoppingList()

  const item = listing.item
  const isMarked = listing.marked

  return (
    <Container
      $isMarked={isMarked}
      onClick={() => toggleMarked(item.name)}
    >
      
        <ShoppingImg><img src={item.img} alt={item.name} /></ShoppingImg>
      
      <ShoppingText>
        <ProduceName>{item.name}</ProduceName>


          <Buttons>
          <Button 
            $id={'mark'}
            onClick={() => toggleMarked(item)}
          >
            {isMarked ? 'Undo' : 'Mark done'}
          </Button>
          <Divider>|</Divider>
          <Button $id={'remove'}
            onClick={() => removeItem(listing)}>
            Remove
          </Button>
          </Buttons>




      </ShoppingText>
      
    </Container>
  )
}

export default ShoppingCard;