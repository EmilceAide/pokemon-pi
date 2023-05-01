const { Router } = require("express");
const { validateCreate } = require("../middlewares/validateCreate")
const {
  getPokemons,
  getPokemonById,
  createPokemon,
} = require("../handlers/pokemonsHandler");


const pokemonRouter = Router();

pokemonRouter.get("/", getPokemons);

pokemonRouter.get("/:id", getPokemonById);

pokemonRouter.post("/", validateCreate,  createPokemon);


module.exports = pokemonRouter;
