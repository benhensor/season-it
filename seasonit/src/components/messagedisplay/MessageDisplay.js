import React from 'react'
import './messagedisplay.css'

function MessageDisplay({ message }) {
  return (
    <div className="message-container">
      <h1 className="message">{message}</h1>
    </div>
  )
}

export default MessageDisplay