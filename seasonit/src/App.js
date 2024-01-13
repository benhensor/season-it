import React, { useState } from 'react'
import Header from './components/header/Header'
import NavBar from './components/nav/NavBar'
import Display from './components/display/Display'
import { formatData } from './formatData'
import { useShoppingList } from './context/ShoppingListContext'
import { useProduceList } from './context/ProduceListContext'
import './App.css';
import MessageDisplay from './components/messagedisplay/MessageDisplay'





function App() {

  // Get current month and convert to name
  const date = new Date();
  const currentMonthNumber = date.getMonth();
  const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', '' ];

  const { updateProduceList } = useProduceList();
  const { shoppingList, addToShoppingList, removeFromShoppingList, clearShoppingList } = useShoppingList();

  // Sets the current month
  const [currentMonth, setCurrentMonth] = useState(months[currentMonthNumber])
  // Sets the display message to show what's being displayed
  const [message, setMessage] = useState('Select an option above')
  // Tracks selected items for styling
  const [selectedItem, setSelectedItem] = useState([])
  // Toggle for switching between seasonal produce and the shopping list
  const [produceListDisplay, setProduceListDisplay] = useState(false)
  // Set visibility of placeholder image in display 
  const [placeholder, setPlaceholder] = useState(true)

  // Removes items from the shopping list and re-renders the produceList
  function handleRemoveFromShoppingList(itemName) {
    if (shoppingList.length === 1 && shoppingList[0].name === itemName) {
      setMessage('Shopping list is empty')
      setPlaceholder(true)
      clearShoppingList()
    } else {
      removeFromShoppingList((itemName))
      // setProduceList((prevProduceList) =>
      //   prevProduceList.filter((item) => item.name !== itemName)
      // );
    }
  }
    
  
  // Displays seasonal produce for the current month
  function showCurrent() {
    setMessage(`Seasonal Produce for ${months[currentMonthNumber]}`)
    updateProduceList(formatData(months[currentMonthNumber]))
    setProduceListDisplay(false)
    const select = document.querySelector('select')
    select.selectedIndex = 0
    setPlaceholder(false)
  }


  // Displays seasonal produce based on a chosen month
  function showMonthly(selectedValue) {
    setMessage(`Seasonal Produce for ${selectedValue}`)
    setCurrentMonth(selectedValue)
    updateProduceList(formatData(selectedValue))
    setProduceListDisplay(false)
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
    setProduceListDisplay(true)
    setSelectedItem([])
    updateProduceList([])
  }


  // Clears the current display 
  function clearList() {
    updateProduceList([])
    const select = document.querySelector('select')
    select.selectedIndex = 0
    setMessage('Select an option above')
    setProduceListDisplay(false)
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
    if (!shoppingList.some(item => item.name === itemName)) {
    handleAddToShoppingList(produce)
    addToSelected(produce.name)
    } else {
      setMessage('Item already in shopping list')
    }
  }




  return (
    <main>
      <section id="main">
        <Header />
          <NavBar
            currentMonth={currentMonth}
            showCurrent={showCurrent}
            showShoppingList={showShoppingList}
            clearList={clearList}
            months={months}
            showMonthly={showMonthly}
          />
          <MessageDisplay message={message} />
          <Display
            placeholder={placeholder}
            shoppingList={shoppingList}
            selectedItem={selectedItem}
            selectItem={selectItem}
            produceListDisplay={produceListDisplay}
            handleRemoveFromShoppingList={handleRemoveFromShoppingList}
          />
      </section>
    </main>
  );
}

export default App;
