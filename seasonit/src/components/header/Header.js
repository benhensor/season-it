import React from 'react'
import Logo from '../../assets/logo.png'
import './header.css'

const Header = () => {
  return (
    <header>
      <article>

          <img src={Logo} alt="logo" />
          <div id="titles">
          <h1>SeasonIt!</h1>
          <h2>Eat more seasonal produce</h2>
          </div>

      </article>

    </header>
  )
}

export default Header