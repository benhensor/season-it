import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    justify-content: space-around;
    gap: 1rem;
  }
`

const Button = styled.button`
  width: 10rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 0.3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: all 0.05s ease-in-out;
  border: 2px solid #147900;
  background-color: #212121;
  color: #eee;
  &:hover {
    color: #fff;
    border: 2px solid #2cff02;
    background-color: #323e31;
  }
  p {
    font-size: 1.2rem;
  }
`

export default function Buttons({ showCurrent, showShoppingList, reset }) {

 
  return (
    <Container>
      <Button onClick={showCurrent}>
        <p>View Current</p>
      </Button>
      <Button onClick={showShoppingList}>
        <p>Shopping List</p>
      </Button>
      <Button onClick={reset}>
        <p>Reset</p>
      </Button>
    </Container>
  )
}