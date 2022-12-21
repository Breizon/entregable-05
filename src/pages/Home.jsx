import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setTrainerGlobal } from '../store/slices/trainer.slice'
import './styles/home.css'

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = e => {
      e.preventDefault()
      dispatch(setTrainerGlobal(e.target.name.value.trim()))
      e.target.name.value = ''
      navigate('/pokedex')
  } 

  return (
    <div className='home'>
        <img className='home_img' src="https://i.pinimg.com/originals/bd/cd/20/bdcd20f5411ee5785889542d303ad4cb.png" alt="" />
        <h1 className='home_title'>Hi Trainer!</h1>
        <p className='home_p'>Give me your name to start</p>
        <form className='home_form' onSubmit={handleSubmit}>
            <input className='home_input' id='name' type="text" />
            <button className='home_btn'>Start</button>
        </form>
    </div>
  )
}

export default Home