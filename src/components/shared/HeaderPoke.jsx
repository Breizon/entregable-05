import React from 'react'
import './styles/headerPoke.css'

const HeaderPoke = () => {
  return (
    <header className='header'>
      <div className='header_black'>
        <div className='header_circle'></div>
        <img className='header_img' src="https://archive.org/download/PokemonIcon/pokemon%20icon.png" alt="" />
      </div>
    </header>
  )
}

export default HeaderPoke