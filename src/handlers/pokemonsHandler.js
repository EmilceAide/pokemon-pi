const { createPokemonController, getPokemonController, getAllPokemons, pokemonByName  } = require('../controllers/pokemonsController')

//!Handlers - Pokemons 

//* Funcion para traer los pokemones
const getPokemons = async (req, res)=>{
    try {
        const {name} = req.query

        const result = !name ?   await getAllPokemons() : await pokemonByName(name) 

        res.status(200).json(result)
    } catch (error) {
        res.status(404).send({error: error.message})
    }
};

//* Funcion para traer los pokemones por Id
const getPokemonById = async (req, res)=>{
    const { id }= req.params;

    const source = isNaN(id) ? 'bdd' : 'api'; 

    try {
         const result = await  getPokemonController(id, source)

        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}; 

//* Funcion para crear pokemones
const createPokemon = async (req, res)=>{
    try {
        const {name, image, hp, attack, defense, speed, height, weight, types} = req.body

        const newPokemon = await createPokemonController(name, image, hp, attack, defense, speed, height, weight, types)
  
        res.status(201).json(newPokemon)

    } catch (error) {
        return res.status(404).send({error: error.message})
    }
}; 

module.exports ={
    getPokemons, 
    getPokemonById,
    createPokemon
}