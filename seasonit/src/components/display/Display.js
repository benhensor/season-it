import React, { useState, useEffect } from 'react'
import { useProduceList } from '../../context/ProduceListContext'
import { useShoppingList } from '../../context/ShoppingListContext'
import ProduceCard from '../producecard/ProduceCard'
import ShoppingCard from '../shoppingcard/ShoppingCard'
import Image from '../../assets/seasons-banner3.jpeg'
import './display.css'


export function Display({ placeholder, selectedItem, selectItem, produceListDisplay, handleRemoveFromShoppingList }) {

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
    <div id="display">
    <img className={`display-placeholder ${placeholder ? 'visible' : ''}`} src={Image} alt="Fruit & Veg" />
    
      {!produceListDisplay ? (
        <article className="display-list scrollable-list">
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
        </article>

      ) : (

        <article className="display-list scrollable-list">
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
        </article>
      )}
    </div>
  )
}

export default Display