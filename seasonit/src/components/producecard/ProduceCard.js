import React from 'react'
import './producecard.css'

export function ProduceCard({ produce, selectItem, selectedItem }) {

  const isItemSelected = selectedItem.includes(produce.name)



  return (
    <section 
      id="produce-card"
      className={`produce-list-item ${isItemSelected ? 'selected' : ''}`}
      onClick={(e) => selectItem(e, produce)}
    >
      <img src={produce.img} alt={produce.name} />
      <div id="produce-card-text">
        <h1>{produce.name}</h1>

          <button
            id="add"
            //className={`produce-list-item ${isItemSelected ? 'selected' : ''}`}
            // onClick={(e) => selectItem(e, produce)}
          >
            {isItemSelected ? 'Added to List' : 'Add to List'}
          </button>
      </div>
      
    </section>
  )
}

export default ProduceCard;