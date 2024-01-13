import React from 'react'
import './shoppingcard.css'

export function ShoppingCard({ produce, markedItems, toggleMarked, removeItem }) {

  const isMarked = markedItems.includes(produce.name)

  return (
    <section 
      id="shopping-card"
      className={`shopping-list-item ${isMarked ? 'marked' : ''}`}
      onClick={() => toggleMarked(produce)}
    >
      
        <img src={produce.img} alt={produce.name} />
      
      <div id="shopping-list-text">
        <h1>{produce.name}</h1>


          <div id="shopping-list-btns">
          <button 
            id="done"
          >
            {markedItems.includes(produce.name) ? 'Undo' : 'Mark done'}
          </button>
          <span>|</span>
          <button
            id="remove"
            onClick={() => removeItem(produce)}>
            Remove
          </button>
          </div>




      </div>
      
    </section>
  )
}

export default ShoppingCard;