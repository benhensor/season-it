import React, { useState } from 'react'
import Header from './components/header/Header'
import NavBar from './components/nav/NavBar'
import Display from './components/display/Display'
import Message from './components/message/Message'
import { formatData } from './formatData'
import { useShoppingList } from './context/ShoppingListContext'
import { useProduceList } from './context/ProduceListContext'
import './App.css';

function App() {

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  // Context
  const { updateProduceList } = useProduceList();
  const { shoppingList, addToShoppingList, removeFromShoppingList, clearShoppingList } = useShoppingList();

  // State
  const [message, setMessage] = useState('Select an option above')
  const [selectedItem, setSelectedItem] = useState([])
  const [display, setDisplay] = useState(false)
  const [placeholder, setPlaceholder] = useState(true)


  // Removes items from the shopping list and re-renders the produceList
  function handleRemoveFromShoppingList(itemName) {
    if (shoppingList.length === 1 && shoppingList[0].name === itemName) {
      setMessage('Shopping list is empty')
      setPlaceholder(true)
      clearShoppingList()
    } else {
      removeFromShoppingList((itemName))
    }
  }
    
  
  // Displays seasonal produce for the current month
  function showCurrent() {
    setMessage(`Seasonal Produce for ${currentMonth}`)
    updateProduceList(formatData(currentMonth))
    setDisplay(false)
    const select = document.querySelector('select')
    select.selectedIndex = 0
    setPlaceholder(false)
  }


  // Displays seasonal produce based on a chosen month
  function showMonthly(selectedValue) {
    setMessage(`Seasonal Produce for ${selectedValue}`)
    updateProduceList(formatData(selectedValue))
    setDisplay(false)
    setPlaceholder(false)
  }


  // Displays the shopping list message
  function shoppingListMessage(shoppingList) {
    if (shoppingList.length === 0) {
      setPlaceholder(true)
      return 'Shopping list is empty'
    } else {
      setPlaceholder(false)
      return 'Shopping List'
    }
  }


  // Displays the shopping list
  function showShoppingList() {
    setMessage(shoppingListMessage(shoppingList))
    setDisplay(true)
    setSelectedItem([])
    updateProduceList([])
  }


  // Clears the current display 
  function clearList() {
    updateProduceList([])
    const select = document.querySelector('select')
    select.selectedIndex = 0
    setMessage('Select an option above')
    setDisplay(false)
    setSelectedItem([])
    setPlaceholder(true)
    clearShoppingList()
  }


  // Checks for duplicates before adding to shopping list
  function handleAddToShoppingList(produce) {
    addToShoppingList(produce)
  }


  // Checks for duplicates before adding to selected items
  function addToSelected(target) {
    const itemIndex = selectedItem.indexOf(target)
    const tempSelected = [...selectedItem]
    if ( itemIndex === -1 ) {
      tempSelected.push(target)
      setSelectedItem(tempSelected)
    } else {
      const updatedItems = selectedItem.filter((item) => item !== target)
      setSelectedItem(updatedItems)
    }
  }


  // handles item selection
  function selectItem(produce) {
    const itemName = produce.name.trim()
    const currentMonthProduce = formatData(currentMonth)
    const endsInS = itemName[itemName.length - 1] === 's' ? true : false
    const previousMessage = message
    // Check for duplicates
    if (shoppingList.some(item => item.name === itemName)) {
      const errorMessage = endsInS ? `${itemName} are already in the shopping list!` : `${itemName} is already in the shopping list!`
        setMessage(errorMessage)

        setTimeout(() => {
          setMessage(previousMessage)
        }, 1000)

        return
    }
    // Check if item is in season
    if (!currentMonthProduce.some(item => item.name === itemName)) {
      if (endsInS) {
        setMessage(`${itemName} are not in season`)
        return
      } else {
        setMessage(`${itemName} is not in season`)
        return
      }
    } 
    handleAddToShoppingList(produce)
    addToSelected(produce.name)
  }


  return (
    <main>
      <div className="main">
        <Header />
          <NavBar
            currentMonth={currentMonth}
            showCurrent={showCurrent}
            showShoppingList={showShoppingList}
            clearList={clearList}
            showMonthly={showMonthly}
          />
          <Message
            message={message}
            setMessage={setMessage}
            display={display}
            clearList={clearList}
          />
          <Display
            placeholder={placeholder}
            shoppingList={shoppingList}
            selectedItem={selectedItem}
            selectItem={selectItem}
            display={display}
            handleRemoveFromShoppingList={handleRemoveFromShoppingList}
          />
      </div>
    </main>
  );
}

export default App;