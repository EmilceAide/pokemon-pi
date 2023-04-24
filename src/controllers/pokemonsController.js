const { Pokemon } = require("../db");
const axios = require('axios'); 


const createPokemonController = async (name, image, hp, attack, defense, speed, height, weight, type) => {

  const newPokemon = await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight, type});

  return newPokemon; 

};


const getpokemonController = async (id, source) => {
    const pokemon =
    source === 'api' 
    ? (await axios.get(`${id}`)).data
    : await Pokemon.findByPk(id);

    return pokemon;
};


const cleanArray = (arr) => {
    arr.map((el) => {
        return {
            id: el.id, 
            name: el.name,
            created: false
        }
    })

}; 

const getAllPokemons = async () =>{
    const dbPokemons = await Pokemon.findAll();

    const apiPokemonsRaw = (await axios.get('')).data; 

    const apiPokemons = cleanArray(apiPokemonsRaw); 
    apiPokemons.setPokemon(typeId)

    const results = [...dbPokemons, ...apiPokemons];

    return results; 
};


const pokemonByName = async (name) => {
    const dbPokemons = await Pokemon.findAll({ where: {name: name}});

    const apiPokemonsRaw = (await axios.get('')).data; 

    const apiPokemons = cleanArray(apiPokemonsRaw); 

    const filterPokemons = apiPokemons.filter(el => el.name === name)

    const results = [...dbPokemons, ...filterPokemons];

    return results; 
}; 


module.exports = {
    createPokemonController,
    getpokemonController,
    getAllPokemons, 
    pokemonByName
}