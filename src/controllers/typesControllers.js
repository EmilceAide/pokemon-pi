const { Type } = require("../db");
const { getTypes } = require("../service/axios");

const getPokemonTypes = async () => {
    const types = [];

	const data = await  getTypes().then(res =>{
        const dataTypePokemon = res.data.results;
        dataTypePokemon.map(el => types.push(el.name))
    })

    const create = await Type.findOrCreate({
        where: { name: types},
      });

    const select = await Type.findAll({
        attributes: ['name']
      })
    const dataType = select.map(el => el)
    return dataType;
};

module.exports = {
	getPokemonTypes
}