import React, { useRef, useState, useEffect } from 'react'
import './displayacc.css'
import ProduceCard from '../producecard/ProduceCard'


export function DisplayAcc({ produceList, selectedItem, selectItem, produceListDisplay, deleteFromShoppingList }) {


  const [markedItems, setMarkedItems] = useState([])
  const [localProduceList, setLocalProduceList] = useState(produceList)


  useEffect(() => {
    setLocalProduceList(produceList)
  }, [produceList])


  function toggleMarked(item) {
    if (markedItems.includes(item.name)) {
      setMarkedItems((prevMarked) => prevMarked.filter((itemName) => itemName !== item.name))
    } else {
      setMarkedItems((prevMarked) => [...prevMarked, item.name])
    }
  }


  function removeItem(item) {
    const updatedProduce = produceList.filter((itemObj) => itemObj.name !== item.name)
    setLocalProduceList(updatedProduce)
    setMarkedItems((prevMarked) => prevMarked.filter((itemName) => itemName !== item.name))
    deleteFromShoppingList(item.name)
  }


  const produceListRef = useRef(null)

  const toggleListItem = (itemToActivate) => {
    // Retrieve the necessary elements using the panelToActivate parameter
    const buttons = itemToActivate.parentElement.querySelectorAll('.display-trigger');
    const content = itemToActivate.parentElement.querySelectorAll('.display-content');

    // Update the attributes of buttons and content elements
    buttons.forEach((button) => button.setAttribute('aria-expanded', false));
    content.forEach((content) => content.setAttribute('aria-hidden', true));

    itemToActivate.querySelector('.display-trigger').setAttribute('aria-expanded', true);
    itemToActivate.querySelector('.display-content').setAttribute('aria-hidden', false);
  };

  const handlePanelClick = (e) => {
    const activeItem = e.target.closest('.display-panel');
    if (!activeItem) return;
    console.log(activeItem)
    toggleListItem(activeItem);
  };


  return (
    <section>

      {localProduceList.length > 0 && (

      <div className="display-container scrollable-list" ref={produceListRef} >

        {localProduceList.map((produce, index) => (

          <div className='display-panel' onClick={handlePanelClick} >
          <div className={`panel${index + 1}`}>
          <div>
          <ProduceCard 
            className="display-content" 
            id="panel1-content" 
            aria-labelledby="panel1-heading" 
            aria-hidden="false" 
            role="region"
            key={index}
            selectItem={selectItem}
            selectedItem={selectedItem}
            produce={produce}
            produceListDisplay={produceListDisplay}
            toggleMarked={toggleMarked}
            removeItem={removeItem}
            deleteFromShoppingList={deleteFromShoppingList}
          />
          </div>
          <button className='display-trigger' aria-controls='panel1-content' aria-expanded='true'></button>
          
          </div>
          </div>


        ))}

      </div>

    )}

    </section>
  )
}

export default DisplayAcc;