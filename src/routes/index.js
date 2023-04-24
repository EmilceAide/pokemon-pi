const { Router } = require('express');
const pokemonsRouter = require('./pokemonsRouter')

const router = Router();

router.use('/pokemons', pokemonsRouter)

module.exports = router; 