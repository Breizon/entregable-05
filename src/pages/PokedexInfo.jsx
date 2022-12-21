import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './styles/pokedexInfo.css'

const PokedexInfo = () => {

  const { id } = useParams()

  const [pokemon, setPokemon] = useState()

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`
    axios.get(URL)
    .then(res => setPokemon(res.data))
    .catch(err => console.log(err))
  }, [id])

  console.log(pokemon)

  return (
    <article className= 'pokemon-card' >
        <header className={`poke-card_headers bg-${pokemon?.types[0].type.name}`}>
            <img className='poke-card_sprite' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
        </header>
        <section className='poke-card_body'>
            <h3 className='poke-card_name'>{pokemon?.name}</h3>
            <ul className='poke-card_types-container'>
                {
                    pokemon?.types.map(type => (
                        <li className='poke-card_type' key={type.type.name}>{type.type.name}</li>
                    ))
                }
            </ul>
        </section>
        <footer className='poke-card_footer'>
            <ul className='poke-card_stats-container'>
                {
                    pokemon?.stats.map(stat => (
                        <li className='poke-card_stat' key={stat.stat.name}>
                            <span className='poke-card_label'>{stat.stat.name}</span>
                            <span className='poke-card_label'>{stat.base_stat}</span>
                        </li>
                    ))
                }
            </ul>
        </footer>    
    </article>
  )
}

export default PokedexInfo