import React, { useState } from 'react'
import { formatData } from './formatData'
import Header from './components/header/Header'
import NavBar from './components/nav/NavBar'
import Display from './components/display/Display'
import './App.css';





function App() {


  // Get current month and convert to name
  const date = new Date();
  const currentMonthNumber = date.getMonth();
  const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', '' ];
  // console.log(currentMonth);


  // Sets the current month
  const [currentMonth, setCurrentMonth] = useState(months[currentMonthNumber])
  // Sets the display message to show what's being displayed
  const [message, setMessage] = useState('Select an option above')
  // Sets the data to be passed to the display component
  const [produceList, setProduceList] = useState([])
  // Sets what items the user has selected
  const [shoppingList, setShoppingList] = useState([])
  // Tracks selected items for styling
  const [selectedItem, setSelectedItem] = useState([])
  // Toggle for switching between seasonal produce and the shopping list
  const [produceListDisplay, setProduceListDisplay] = useState(false)
  // Set visibility of placeholder image in display 
  const [placeholder, setPlaceholder] = useState(true)


  // Set the seasonal produce for the current month
  // useEffect(() => {
  //     setProduceList(formatData(currentMonth))
  // }, [currentMonth])


  // Removes items from the shopping list and re-renderes the produceList
  function deleteFromShoppingList(itemName) {
    if (shoppingList.length === 0) {
      setMessage('Shopping list is empty')
      setPlaceholder(true)
    } else {
    setShoppingList((prev) => prev.filter((item) => item.name !== itemName))
    setProduceList((prevProduceList) =>
      prevProduceList.filter((item) => item.name !== itemName)
    );
  }
    
  }
    
  
  // Displays seasonal produce for the current month
  function showCurrent() {
    setMessage(`Seasonal Produce for ${months[currentMonthNumber]}`)
    setProduceList(formatData(months[currentMonthNumber]))
    setProduceListDisplay(false)
    const select = document.querySelector('select')
    select.selectedIndex = 0
    setPlaceholder(false)
  }


  // Displays seasonal produce based on a chosen month
  function showMonthly(selectedValue) {
    setMessage(`Seasonal Produce for ${selectedValue}`)
    setCurrentMonth(selectedValue)
    setProduceList(formatData(selectedValue))
    setProduceListDisplay(false)
    setPlaceholder(false)
  }


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
    // setProduceList(shoppingList)
    setProduceListDisplay(true)
    setSelectedItem([])
    setProduceList([])
  }


  // Clears the current display 
  function clearList() {
    setProduceList([])
    const select = document.querySelector('select')
    select.selectedIndex = 0
    setMessage('Select an option above')
    
    setProduceListDisplay(false)
    setSelectedItem([])
    setPlaceholder(true)
  }


  // Checks for duplicates before adding to shopping list
  function addToShoppingList(e, produce) {
    e.preventDefault();
    const item = produce.name.trim();
    const tempList = [...shoppingList]
    if (item) {
      if (!tempList.some(itemObj => itemObj.name === item)) {  // Check for duplicates based on produce name
        tempList.push(produce);
        setShoppingList(tempList);
      }
    }
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
  function selectItem(e, produce) {
    addToShoppingList(e, produce)
    addToSelected(produce.name)
    // console.log('clicked')
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
        <Display
          message={message}
          placeholder={placeholder}
          produceList={produceList}
          shoppingList={shoppingList}
          selectedItem={selectedItem}
          selectItem={selectItem}
          produceListDisplay={produceListDisplay}
          deleteFromShoppingList={deleteFromShoppingList}
        />
      </section>
    </main>
  );
}

export default App;
