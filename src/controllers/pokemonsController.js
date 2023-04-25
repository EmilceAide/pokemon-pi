const { Pokemon, Type } = require("../db");
const {
    getPokemonId,
    getPokemonName,
    getPokemons, 
    getDataPokemon
   } = require('../service/axios')

//! Pokemons 
const arrPokemon = (element) => {
    const dataPokemon = {
        id: element.id,
        name: element.forms[0].name,
        image: element.sprites.other.home.front_shiny,
        hp: element.stats.find((stat) => stat.stat.name === 'hp').base_stat,
        attack: element.stats.find((stat) => stat.stat.name === 'attack').base_stat,
        defense:  element.stats.find((stat) => stat.stat.name === 'defense').base_stat,
        speed:  element.stats.find((stat) => stat.stat.name === 'speed').base_stat,
        height: element.height,
        weight: element.weight,
        types: element.types.map(el => el.type.name).join(', ')
    }

    return dataPokemon;
};



const getpokemonController = async (id, source) => {
    const pokemon = []; 
    
    const pokemonId = await getPokemonId(id).then(res => {
        const data = []
        data.push(res.data)
        data.map(el => {
            const dataPokemon = arrPokemon(el)
            pokemon.push(dataPokemon)
        }) 
    });
    
    return source === 'bdd' ? await Pokemon.findByPk(id) : pokemon;
};


const getAllPokemons = async () =>{
    
    let pokemons = [];
    
    const apiPokemons = await getPokemons(10).then(async (res )=> {
        return  res.data.results
    });
    
    const apiPokemon = await apiPokemons.map(async (el) => {
        const pokemon =  await getDataPokemon(el.url)
        return pokemon.data
    })
    
    const detailPokemon = await Promise.all(apiPokemon)
    
    detailPokemon.map(data => {
        const dataPokemon = arrPokemon(data)
        pokemons.push(dataPokemon)
    });
    
    const dbPokemons = await Pokemon.findAll({
        attributes: ['id', 'name', 'image', 'hp', 'attack', 'defense', 'speed', 'height', 'weight'],
        order: [ ['id', 'DESC'],], 
        include: { 
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
    
    return pokemons.concat(dbPokemons)
};


const createPokemonController = async (name, image, hp, attack, defense, speed, height, weight, types) => {

  const allPokemons = await getAllPokemons();

  const pokemonExists = allPokemons.find(pokemon => pokemon.name === name);

  if (pokemonExists) {
    throw new Error('El nombre ya existe.');
  }

  const newPokemon = await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight });

  const typesData = await Type.findAll({
    attributes: ['name']
  }); 

  return newPokemon;
};


const pokemonByName = async (name) => {
    const pokemon = [];

    const apiPokemonsRaw = await getPokemonName(name).then(res => {
        const data = []
        data.push(res.data)
        data.map(el => {
            const dataPokemon = arrPokemon(el)
            pokemon.push(dataPokemon)
        }) 
    })
    
    const dbPokemons = await Pokemon.findAll({ where: {name: name}});

    return pokemon.concat(dbPokemons)
};

module.exports = {
    createPokemonController,
    getpokemonController,
    getAllPokemons, 
    pokemonByName, 
}