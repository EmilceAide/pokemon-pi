const { createPokemonController, getpokemonController, getAllPokemons, pokemonByName  } = require('../controllers/pokemonsController')

const getPokemons = async (req, res)=>{
    try {
        
        const {name} = req.query;
        
        const results = name ? await pokemonByName(name) : await getAllPokemons()

        res.status(200).json(results)
    } catch (error) {
        return res.status(404).send({error: error.message})
    }
};


const getPokemonById = (req, res)=>{
    const {id} = req.params; 
    const source = isNaN(id) ? 'bdd' : 'api'; 

    try {
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
    createPokemon
}