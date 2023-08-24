import React from 'react'
import './navbar.css'
import Buttons from '../buttons/Buttons'
import SelectMonth from '../selectmonth/SelectMonth'



export function NavBar({ months, showCurrent, showShoppingList, clearList, showMonthly }) {

  return (
    <nav>
      <Buttons 
        showCurrent={showCurrent}
        showShoppingList={showShoppingList}
        clearList={clearList}
      />
      <SelectMonth
        months={months}
        showMonthly={showMonthly}
      />
    </nav>
  )
}

export default NavBar