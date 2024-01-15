import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
`

const Select = styled.select`
  width: 100%;
  text-align: left;
  font-size: 1.2rem;
  color: #333;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 0.3rem;
  &:focus {
    outline: none;
    border: 1px solid #333;
  }
`

const Option = styled.option`
  text-align: left;
  height: 4rem;
  font-size: 1.2rem;
  color: #333;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 0.3rem;
`

export default function SelectMonth({ showMonthly }) {

  const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December', '']
  const excludeFinalIndex = months.slice(0, -1)


  return (
    <Container>
      <form action="">
        <Select
            name="date"
            type="date"
            onChange={(e) => showMonthly(e.target.value)}
        >
            <Option value="">Select a month</Option>
            {excludeFinalIndex.map((month, index) => (
              <Option key={index} value={month.value}>{month}</Option>
            ))}
        </Select>
      </form>
    </Container>
  )
}