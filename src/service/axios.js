const axios = require('axios'); 

const urlBase = 'https://pokeapi.co/api/v2/';

const getPokemonId = (id) =>{
   return  axios.get(`${urlBase}/pokemon/${id}`)
};

const getPokemonName = (name) =>{
    return  axios.get(`${urlBase}/pokemon/${name}`)
};

const getPokemons = (amount) => {
  return  axios.get(`${urlBase}/pokemon?limit=${amount}`)
};

const getDataPokemon = (pokemon) => {
 return axios.get(pokemon)
};

module.exports ={
 getPokemonId,
 getPokemonName,
 getPokemons, 
 getDataPokemon, 
 getDataPokemon,
}