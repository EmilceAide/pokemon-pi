require('dotenv').config()
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;

const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false
});

const basename = path.basename(__filename);//nombre del archivo actual
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
   });


modelDefiners.forEach((model) => model(database));

let entries = Object.entries(database.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
database.models = Object.fromEntries(capsEntries);

// console.log("son mis modelos", database.models)
const { Pokemon, Type } = database.models;

Type.belongsToMany(Pokemon, { through: 'Types_Pokemons' })
Pokemon.belongsToMany(Type, { through: 'Types_Pokemons' })

module.exports ={
    database, 
    ...database.models
}