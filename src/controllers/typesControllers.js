const { Type } = require("../db");
const { getTypes } = require("../service/axios");

//! Controllers - Types Pokemons 
//*Función para traer todos los tipos de pokemons
const getPokemonTypes = async () => {

  const types = [];

	const data = await  getTypes().then(res =>{
        const dataTypePokemon = res.data.results;
        dataTypePokemon.map(el => types.push(el.name))
    })
      
  const dataTypePokemon = types.map(async ( el )=> {
    await Type.findOrCreate({
          where: { name: el},
        });
  } )

   const select = await Type.findAll({
        attributes: ['id','name']
      });

    const dataType = select.map(el => el)

    return dataType;
};

module.exports = {
	getPokemonTypes,
}