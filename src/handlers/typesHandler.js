const { getPokemonTypes } = require('../controllers/typesControllers')

const getTypes = async (req, res) => {
    try {
        const result = await getPokemonTypes()
        
        res.status(200).json(result)
    } catch (error) {
        return res.status(404).send({error: error.message})
    }
}

module.exports ={
    getTypes,
}