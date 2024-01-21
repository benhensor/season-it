import React from 'react'
import styled from 'styled-components'

const Container = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: #3A452A;
  color: #EEE;
  border-bottom: 1px solid #77777730;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #2F3822;
    img {
      border: 2px solid #2cff02; 
    }
  }
  ${({$isItemSelected}) => $isItemSelected && `
    background-color: #212718;

    img {
      border: 2px solid #2cff02;
    }
  `}
`

const ProduceImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    border: 2px solid #2d5e23;
    transition: all 0.2s ease-in-out;
  }
`

const ProduceText = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;  
`

const ProduceName = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
`

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: #b8b8b8;
  font-size: 1rem;
  transition: all 0.05s ease-in-out;
`

export default function ProduceCard({ produce, selectItem, selectedItem }) {

  const isItemSelected = selectedItem.includes(produce.name)

  return (
    <Container
      $isItemSelected={isItemSelected}
      onClick={() => selectItem(produce)}
    >
      <ProduceImg><img src={produce.img} alt={produce.name} /></ProduceImg> 
      <ProduceText>
        <ProduceName>{produce.name}</ProduceName>
        <Button>
          {isItemSelected ? 'Added to List' : 'Add to List'}
        </Button>
      </ProduceText>
    </Container>
  )
}