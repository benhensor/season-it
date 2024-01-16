import React, { useState } from 'react'
import styled from 'styled-components'
import Header from './components/header/Header'
import NavBar from './components/nav/NavBar'
import Display from './components/display/Display'
import MessageBox from './components/message/MessageBox'
import { Messages } from './components/messages/Messages'
import { formatData } from './formatData'
import { useShoppingList } from './context/ShoppingListContext'
import { useProduceList } from './context/ProduceListContext'

const Main = styled.main`
  margin: 10rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35rem;
  height: 75rem;
  overflow: hidden;
  border-radius: 2.5rem;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.9);
  background-color: #21241f;
  border: 5px solid #21241f;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export default function App() {

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  // Context
  const { updateProduceList } = useProduceList();
  const { shoppingList, addToShoppingList, removeFromShoppingList, clearShoppingList } = useShoppingList();

  // State
  const [month, setMonth] = useState(currentMonth)
  const [message, setMessage] = useState(<Messages type='default' />)
  const [selectedItem, setSelectedItem] = useState([])
  const [display, setDisplay] = useState(false)
  const [placeholder, setPlaceholder] = useState(true)
  const [resetSelect, setResetSelect] = useState(false)
  const [filteredProduceType, setFilteredProduceType] = useState(null)


  // Removes items from the shopping list and re-renders the produceList
  function handleRemoveFromShoppingList(listing) {
    if (shoppingList.length === 1 && shoppingList[0].item.name === listing.item.name) {
      setMessage(<Messages type='default' />)
      setPlaceholder(true)
      setResetSelect(false)
      clearShoppingList()
    } else {
      removeFromShoppingList((listing))
    }
  }
    
  
  // Displays seasonal produce for the current month
  function showCurrent() {
    setMessage(<Messages type='current' currentMonth={currentMonth} />)
    updateProduceList(formatData(currentMonth))
    setDisplay(false)
    setPlaceholder(false)
    setMonth(currentMonth)
    setResetSelect(true)
  }


  // Displays seasonal produce based on a chosen month
  function showMonthly(selectedMonth) {
    setMessage(<Messages type='month' selectedMonth={selectedMonth} />)
    updateProduceList(formatData(selectedMonth))
    setDisplay(false)
    setPlaceholder(false)
    setMonth(selectedMonth)
    setResetSelect(false)
  }


  // Displays the shopping list message
  function shoppingListMessage(shoppingList) {
    if (shoppingList.length === 0) {
      setPlaceholder(true)
      return setMessage(<Messages type='emptyList' />)
    } else {
      setPlaceholder(false)
      return setMessage(<Messages type='shoppingList' />)
    }
  }


  // Displays the shopping list
  function showShoppingList() {
    setMessage(<Messages type='shoppingList' shoppingList={shoppingListMessage(shoppingList)} />)
    setDisplay(true)
    setSelectedItem([])
    updateProduceList([])
  }


  // Clears the current display 
  function reset() {
    updateProduceList([])
    setMessage(<Messages type='default' />)
    setDisplay(false)
    setSelectedItem([])
    setPlaceholder(true)
    clearShoppingList()
    setResetSelect(true)
  }

  
  // Checks for duplicates before adding to selected items
  function addToSelected(target) {
    if (selectedItem.includes(target)) {
      setSelectedItem(selectedItem.filter(item => item !== target));
    } else {
      setSelectedItem([...selectedItem, target]);
    }
  }


  // handles item selection
  function selectItem(produce) {
    const itemName = produce.name.trim();
    const currentMonthProduce = formatData(currentMonth);
    const endsInS = itemName.endsWith('s');
    const previousMessage = message;
  
    // Function to handle message setting and timeout
    const handleTimeoutMessage = (type) => {
      setMessage(<Messages type={type} itemName={itemName} />);
      setTimeout(() => {
        setMessage(previousMessage);
      }, 1000);
    };
  
    // Check for duplicates
    if (shoppingList.some(item => item.item.name === itemName)) {
      handleTimeoutMessage(endsInS ? 'duplicateEndsInS' : 'duplicateNoS');
      return;
    }
  
    // Check if item is in season
    if (!currentMonthProduce.some(item => item.name === itemName)) {
      handleTimeoutMessage(endsInS ? 'errorEndsInS' : 'errorNoS');
      return;
    } 
  
    addToShoppingList(produce);
    addToSelected(produce.name);
  }
  


  return (
    <Main>
      <Container className="main">
        <Header />
          <NavBar
            resetSelect={resetSelect}
            currentMonth={currentMonth}
            showCurrent={showCurrent}
            showShoppingList={showShoppingList}
            reset={reset}
            showMonthly={showMonthly}
          />
          <MessageBox
            month={month}
            message={message}
            setMessage={setMessage}
            Messages={Messages}
            placeholder={placeholder}
            display={display}
            setFilteredProduceType={setFilteredProduceType}
            reset={reset}
          />
          <Display
            placeholder={placeholder}
            shoppingList={shoppingList}
            selectedItem={selectedItem}
            selectItem={selectItem}
            display={display}
            filteredProduceType={filteredProduceType}
            handleRemoveFromShoppingList={handleRemoveFromShoppingList}
          />
      </Container>
    </Main>
  )
}