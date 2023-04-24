const { Router } = require("express");
const {
  getPokemons,
  getPokemonById,
  createPokemon,
} = require("../handlers/pokemonsHandler");

const pokemonRouter = Router();

pokemonRouter.get("/", getPokemons);

pokemonRouter.get("/:id", getPokemonById);

// pokemonRouter.get("/name", getPokemonByName);

pokemonRouter.post("/", createPokemon);

// pokemonRouter.get('/types', )

module.exports = pokemonRouter;
