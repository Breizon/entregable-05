import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pokedex/Pagination'
import PokeCard from '../components/Pokedex/PokeCard'
import './styles/pokedex.css'

const Pokedex = () => {

  const { trainer } = useSelector(state => state)

  const [pokemons, setPokemons] = useState()
  const [types, setTypes] = useState()
  const [typeSelect, seTtypeSelect] = useState('All pokemons')

  const navigate = useNavigate()

  useEffect(() => {
    if (typeSelect !== 'All pokemons') {
      // hace la petición  de los pokemons por tipo
      axios.get(typeSelect)
      .then(res => setPokemons(res.data.pokemon.map(e => e.pokemon)))
      .catch(err => console.log(err))
    } else {
      // hace la petición de todos los pokemons
    const URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000'
    axios.get(URL)
    .then(res => setPokemons(res.data.results))
    .catch(err => console.log(err))
    }
  }, [typeSelect])

  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/type'
    axios.get(URL)
      .then(res => setTypes(res.data.results))
      .catch(err => console.log(err))
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    const input = e.target.search.value.trim().toLowerCase()
    navigate(`/pokedex/${input}`)
  }

  const handleChange = e => {
    seTtypeSelect(e.target.value)
    setPage(1)
  }

  // Logica de paginación
  const [page, setPage] = useState(1)
  const [pokeForPage, setPokeForPage] = useState(9)
  const initialPoke = (page - 1) * pokeForPage
  const finalPoke = page * pokeForPage
  const maxPage = pokemons && Math.ceil(pokemons.length / pokeForPage)
  
  return (
    <div className='card'>
      <h2 className='card_title'>Welcome <span className='card_span'>{trainer}</span>, here you can find your favorite pokemon.</h2>
      <form className='card_form' onSubmit={handleSubmit}>
        <input className='card_input' id='search' type="text" />
        <button className='card_btn'>Search</button>
      </form>
      <select className='card_select' onChange={handleChange}>
        <option className='card_option' value="All pokemons">All pokemons</option>
        {
          types?.map(type => (
            <option key={type.url} value={type.url}>{type.name}</option>
          ))
        }
      </select>
      <div className='card_pg'>
      <Pagination 
        page={page}
        maxPage={maxPage}
        setPage={setPage}
        />
      </div>
      <div className='poke_container'>
        {
          pokemons?.slice(initialPoke, finalPoke).map(pokemon => (
            <PokeCard 
              key={pokemon.url}
              url={pokemon.url}
              />
          ))
        }
      </div>
      <div className='card_pg2'>
      <Pagination 
        page={page}
        maxPage={maxPage}
        setPage={setPage}
        />
      </div>
    </div>
  )
}

export default Pokedex