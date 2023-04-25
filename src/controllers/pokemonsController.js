const { Pokemon } = require("../db");
const {
    getPokemonId,
    getPokemonName,
    getPokemons, 
    getDataPokemon
   } = require('../service/axios')

//! Pokemons 
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




const getAllPokemons = async () =>{
    // const dbPokemons = await Pokemon.findAll();

    const pokemons = [];
     
    const apiPokemons = await getPokemons(10).then(async (res )=> {
       return  res.data.results
    });

    const apiPokemon = await apiPokemons.map(async (el) => {
       const pokemon =  await getDataPokemon(el.url)
       return pokemon.data
    })
    
    const detailPokemon = await Promise.all(apiPokemon)
    
    detailPokemon.map(data => {
         const dataPokemon =  {
                    id: data.id,
                    name: data.forms[0].name,
                    image: data.sprites.other.home.front_shiny,
                    hp: data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
                    attack: data.stats.find((stat) => stat.stat.name === 'attack').base_stat,
                    defense:  data.stats.find((stat) => stat.stat.name === 'defense').base_stat,
                    speed:  data.stats.find((stat) => stat.stat.name === 'speed').base_stat,
                    height: data.height,
                    weight: data.weight,
                }
         pokemons.push(dataPokemon)
    })

    // apiPokemons.setPokemon(typeId)


  return pokemons 
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