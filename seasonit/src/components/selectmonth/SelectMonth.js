import React from 'react'
import './selectmonth.css'



export function SelectMonth({ months, showMonthly }) {


  const excludeFinalIndex = months.slice(0, -1)


  return (
    <article id="select">
    <form action="">
      <select
          name="date"
          type="date"
          onChange={(e) => showMonthly(e.target.value)}
      >
          <option value="">Select a month</option>
          {excludeFinalIndex.map((month, index) => (
            <option key={index} value={month.value}>{month}</option>
          ))}
      </select>
      </form>
    </article>
  )
}

export default SelectMonth