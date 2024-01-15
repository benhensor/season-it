import React from 'react'
import { useProduceList } from '../../context/ProduceListContext'
import { useShoppingList } from '../../context/ShoppingListContext'
import styled from 'styled-components'
import ProduceCard from '../producecard/ProduceCard'
import ShoppingCard from '../shoppingcard/ShoppingCard'
import Image from '../../assets/seasons-banner3.jpeg'

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 24.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  background-color: #3A452A;
  position: relative;
`

const Placeholder = styled.img`
  position: absolute;
  display: none;
  z-index: 0;
  ${({$visible}) => $visible && `
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: calc(50% + 5rem);
    z-index: 0;
  `}
`

const DisplayWindow = styled.div`
  width: 100%;
  z-index: 2;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-track {
    background: transparent; 
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`


export default function Display({ placeholder, selectedItem, selectItem, display, handleRemoveFromShoppingList }) {

  const { produceList } = useProduceList()
  const { shoppingList } = useShoppingList()

  function removeItem(listing) {
    handleRemoveFromShoppingList(listing)
  }

  

  return (
    <Container>
    <Placeholder $visible={placeholder ? 1 : 0} src={Image} alt="Fruit & Veg" />
    
      {!display ? (
        <DisplayWindow>
          {produceList.length > 0 && (
            <>
              {produceList.map((produce) => (
                <ProduceCard 
                  key={produce.id}
                  produce={produce}   
                  selectItem={selectItem}
                  selectedItem={selectedItem}
                />
              ))}
            </>
          )}
        </DisplayWindow>

      ) : (

        <DisplayWindow>
          {shoppingList.length > 0 && (
            <>
              {shoppingList.map((listing) => (
                <ShoppingCard 
                  key={listing.id}
                  listing={listing}
                  removeItem={removeItem}
                />
              ))}
            </>
          )}
        </DisplayWindow>
      )}
    </Container>
  )
}