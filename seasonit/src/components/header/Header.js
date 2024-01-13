import React from 'react'
import Logo from '../../assets/logo.png'
import './header.css'

const Header = () => {
  return (
    <header>
      <div className='header-container'>
          <img src={Logo} alt="logo" />
          <div className="titles">
          <h1>SeasonIt!</h1>
          <h2>Eat more seasonal produce</h2>
          </div>
      </div>
    </header>
  )
}

export default Header