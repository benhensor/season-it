import React from 'react'
import './buttons.css'

export function Buttons({ showCurrent, showShoppingList, clearList }) {

 
  return (
    <section id="buttons">

      <button id="current" onClick={showCurrent}>
      <span>View Current</span>
      </button>

      <button id="shopping" onClick={showShoppingList}>
      <span>Shopping List</span>
      </button>

      <button id="clear" onClick={clearList}>
      <span>Clear</span>
      </button>

    </section>
  )
}

export default Buttons