import React from 'react'
import styled from 'styled-components'
import Buttons from '../buttons/Buttons'
import SelectMonth from '../selectmonth/SelectMonth'

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1rem;
  gap: 2rem;
`

const Line = styled.div`
  width: 100%;
  border: none;
  outline: 1px solid #147900;
`

export default function NavBar({ resetSelect, showCurrent, showShoppingList, reset, showMonthly }) {

  return (
    <Nav>
      <Buttons 
        showCurrent={showCurrent}
        showShoppingList={showShoppingList}
        reset={reset}
      />
      <SelectMonth
        resetSelect={resetSelect}
        showMonthly={showMonthly}
      />
      <Line />
    </Nav>
  )
}