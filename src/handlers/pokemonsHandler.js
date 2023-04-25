const { createPokemonController, getpokemonController, getAllPokemons, pokemonByName  } = require('../controllers/pokemonsController')

const getPokemons = async (req, res)=>{
    try {
        const result =   await getAllPokemons()

        res.status(200).json(result)
    } catch (error) {
        return res.status(404).send({error: error.message})
    }
};


const getPokemonName = async (req, res) =>{
    try {
        const {name} = req.params; 

        const result = await pokemonByName(name) 

        res.status(200).json(result)
    } catch (error) {
        return res.status(404).send({error: error.message})
    }
};


const getPokemonById = (req, res)=>{
    try {
        const {id} = req.params; 
        const source = isNaN(id) ? 'bdd' : 'api'; 
         const pokemon = getpokemonController(id, source)

        res.status(200).json(pokemon)
    } catch (error) {
        return res.status(404).send({error: error.message})
    }
}; 


const createPokemon = async (req, res)=>{
    try {
        const {name, image, hp, attack, defense, speed, height, weight, type} = req.body

        const newPokemon = await createPokemonController(name, image, hp, attack, defense, speed, height, weight, type)
  
        res.status(201).json(newPokemon)

    } catch (error) {
        return res.status(404).send({error: error.message})
    }
}; 

module.exports ={
    getPokemons, 
    getPokemonById,
    createPokemon,
    getPokemonName
}