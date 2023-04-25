require('dotenv').config();
const axios = require('axios'); 
const { URL_BASE } = process.env;

const getPokemonId = (id) =>{
   return  axios.get(`${URL_BASE}/pokemon/${id}`)
};

const getPokemonName = (name) =>{
    return  axios.get(`${URL_BASE}/pokemon/${name}`)
};

const getPokemons = (amount) => {
  return  axios.get(`${URL_BASE}/pokemon?limit=${amount}`)
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