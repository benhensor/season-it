import React from 'react'
import styled from 'styled-components'
import Buttons from '../buttons/Buttons'
import SelectMonth from '../selectmonth/SelectMonth'

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1rem 0 1rem;
  gap: 1rem;
`

const Line = styled.div`
  margin-top: 1rem;
  width: 100%;
  border: none;
  outline: 1px solid #147900;
`

export default function NavBar({ months, showCurrent, showShoppingList, reset, showMonthly }) {

  return (
    <Nav>
      <Buttons 
        showCurrent={showCurrent}
        showShoppingList={showShoppingList}
        reset={reset}
      />
      <SelectMonth
        months={months}
        showMonthly={showMonthly}
      />
      <Line />
    </Nav>
  )
}