import React, { useState, useEffect } from 'react'
import { useProduceList } from '../../context/ProduceListContext'
import { useShoppingList } from '../../context/ShoppingListContext'
import styled from 'styled-components'
import ProduceCard from '../producecard/ProduceCard'
import ShoppingCard from '../shoppingcard/ShoppingCard'
import Image from '../../assets/seasons-banner3.jpeg'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #3A452A;
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

const Placeholder = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 1/2;
  object-fit: cover;
  object-position: center;
  overflow: hidden;
  z-index: 0;
`

const DisplayWindow = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  z-index: 2;
`


export default function Display({ placeholder, selectedItem, selectItem, display, filteredProduceType, handleRemoveFromShoppingList }) {

  const { produceList } = useProduceList()
  const { shoppingList } = useShoppingList()

  const [displayProduce, setDisplayProduce] = useState(produceList)


  useEffect(() => {
    if (filteredProduceType) {
      setDisplayProduce(produceList.filter(produce => produce.type === filteredProduceType))
    } else {
      setDisplayProduce(produceList)
    }
  }, [filteredProduceType, produceList])

  function removeItem(listing) {
    handleRemoveFromShoppingList(listing)
  }


  return (
    <Container>
    {placeholder && (
      <Placeholder src={Image} alt="Fruit & Veg" />
    )}
    
      {!display ? (
        <DisplayWindow>
          {displayProduce.length > 0 && (
            <>
              {displayProduce.map((produce) => (
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