const { Pokemon, Type } = require("../db");
const {
  getPokemonId,
  getPokemonName,
  getPokemons,
  getDataPokemon,
} = require("../service/axios");

//!Controllers - Pokemons

//?Función auxiliar
const arrPokemon = (element) => {
  const dataPokemon = {
    id: element.id,
    name: element.forms[0].name,
    image: element.sprites.other.home.front_shiny,
    hp: element.stats.find((stat) => stat.stat.name === "hp").base_stat,
    attack: element.stats.find((stat) => stat.stat.name === "attack").base_stat,
    defense: element.stats.find((stat) => stat.stat.name === "defense")
      .base_stat,
    speed: element.stats.find((stat) => stat.stat.name === "speed").base_stat,
    height: element.height,
    weight: element.weight,
    types: element.types.map((el) => el.type.name).join(", "),
    created: false,
  };

  return dataPokemon;
};

//*Función para traer todos
const getAllPokemons = async () => {
  let pokemons = [];

  const apiPokemons = await getPokemons(60).then(async (res) => {
    return res.data.results;
  });

  const apiPokemon = await apiPokemons.map(async (el) => {
    const pokemon = await getDataPokemon(el.url);
    return pokemon.data;
  });

  const detailPokemon = await Promise.all(apiPokemon);

  detailPokemon.map((data) => {
    const dataPokemon = arrPokemon(data);
    pokemons.push(dataPokemon);
  });

  const dbPokemons = await Pokemon.findAll({
    attributes: [
      "id",
      "name",
      "image",
      "hp",
      "attack",
      "defense",
      "speed",
      "height",
      "weight",
      "created",
    ],
    order: [["id", "DESC"]],
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  dbPokemons.map( el => pokemons.push(el))

  return pokemons
};

//*Función para traer todos por Id
const getPokemonController = async (id, source) => {
  console.log('source', source)
  if (source === "api") {
    const pokemon = []; 
      const pokemonData = await getPokemonId(id).then(res =>{
        const element = res.data; 
        pokemon.push(arrPokemon(element))
      })
    return pokemon;
  } else {
    const pokemon =[]
    const pokemonData= await Pokemon.findByPk(id);
    pokemon.push(pokemonData)
    return pokemon
  }
  
};

//*Función para crear
const createPokemonController = async (
  name,
  image,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  types
) => {
  const allPokemons = await getAllPokemons();

  const pokemonExists = allPokemons.find((pokemon) => pokemon.name === name);

  if (pokemonExists) {
    throw new Error("El nombre ya existe.");
  }

  const newPokemon = await Pokemon.create({
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
  });

  for (const nameType of types) {
    const type = await Type.findAll({ 
      where: {
        name: nameType
      }
     });
    if (type) {
      await newPokemon.addTypes(type);
    }
  }

  return newPokemon;
};

//*Función para traer por Name
const pokemonByName = async (name) => {

  const pokemon = [];

  const data = await getAllPokemons()

  const pokemonMap = data.map(el => {
    if(el.name.toLowerCase() === name.toLowerCase()){
      pokemon.push(el)
    }
  })

  return pokemon
};

module.exports = {
  createPokemonController,
  getPokemonController,
  getAllPokemons,
  pokemonByName,
};
