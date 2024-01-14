import React, { useState, useEffect } from 'react'
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


export function Display({ placeholder, selectedItem, selectItem, display, handleRemoveFromShoppingList }) {

  const { produceList } = useProduceList()
  const { shoppingList } = useShoppingList()

  const [markedItems, setMarkedItems] = useState([])
  const [updateMarkedItems, setUpdateMarkedItems] = useState(false)

  useEffect(() => {
    if (updateMarkedItems) {
      // Create a set of item names in the shoppingList
      const shoppingListNames = new Set(shoppingList.map((produce) => produce.name));
      // Filter the markedItems to keep only those that exist in shoppingListNames
      const updatedMarkedItems = markedItems.filter((itemName) => shoppingListNames.has(itemName));
      // Update the markedItems state and reset the update flag
      setMarkedItems(updatedMarkedItems);
      setUpdateMarkedItems(false);
    }
  }, [shoppingList, markedItems, updateMarkedItems]);


  function toggleMarked(produce) {
    if (markedItems.includes(produce.name)) {
      setMarkedItems((prevMarked) => prevMarked.filter((itemName) => itemName !== produce.name))
    } else {
      setMarkedItems((prevMarked) => [...prevMarked, produce.name])
    }
    
  }

  function removeItem(produce) {
    setUpdateMarkedItems(true);
    handleRemoveFromShoppingList(produce.name)
  }

  

  return (
    <Container>
    <Placeholder $visible={placeholder ? 1 : 0} src={Image} alt="Fruit & Veg" />
    
      {!display ? (
        <DisplayWindow className="display-list scrollable-list">
          {produceList.length > 0 && (
            <>
              {produceList.map((produce) => (
                <ProduceCard 
                  key={produce.id}
                  selectItem={selectItem}
                  selectedItem={selectedItem}
                  produce={produce}
                />
              ))}
            </>
          )}
        </DisplayWindow>

      ) : (

        <DisplayWindow className="display-list scrollable-list">
          {shoppingList.length > 0 && (
            <>
              {shoppingList.map((produce) => (
                <ShoppingCard 
                  key={produce.id}
                  selectedItem={selectedItem}
                  markedItems={markedItems}
                  produce={produce}
                  toggleMarked={toggleMarked}
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

export default Display