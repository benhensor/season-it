import React, { useState, useEffect } from 'react'
import './display.css'
import ProduceCard from '../producecard/ProduceCard'
import ShoppingCard from '../shoppingcard/ShoppingCard'
import Image from '../../assets/seasons-banner3.jpeg'


export function Display({ message, placeholder, produceList, shoppingList, selectedItem, selectItem, produceListDisplay, deleteFromShoppingList }) {


  const [markedItems, setMarkedItems] = useState([])
  const [localProduceList, setLocalProduceList] = useState(produceList)
  const [localShoppingList, setLocalShoppingList] = useState(shoppingList)


  useEffect(() => {
    setLocalProduceList(produceList)
    setLocalShoppingList(shoppingList)
    //console.log('produceList', produceList[0])
  }, [produceList, shoppingList])



  function toggleMarked(item) {
    if (markedItems.includes(item.name)) {
      setMarkedItems((prevMarked) => prevMarked.filter((itemName) => itemName !== item.name))
    } else {
      setMarkedItems((prevMarked) => [...prevMarked, item.name])
    }
  }



  function removeItem(item) {
    const updatedProduce = produceList.filter((itemObj) => itemObj.name !== item.name)
    setLocalShoppingList(updatedProduce)
    setMarkedItems((prevMarked) => prevMarked.filter((itemName) => itemName !== item.name))
    deleteFromShoppingList(item.name)
  }

  

  return (
    <section id="display">
    <div id="message-container">
    <h1 id="message">{message}</h1>
    </div>
    <img className={`display-placeholder ${placeholder ? 'visible' : ''}`} src={Image} alt="Fruit & Veg" />
    
      {!produceListDisplay ? (
        <article className="display-list scrollable-list">
          {localProduceList.length > 0 && (
            <>
              {localProduceList.map((produce) => (
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
          {localShoppingList.length > 0 && (
            <>
              {localShoppingList.map((produce) => (
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
    </section>
  )
}

export default Display