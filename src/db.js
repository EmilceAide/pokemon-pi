const { Sequelize } = require('sequelize');

require('dotenv').config()
const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;

const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false
});


module.exports ={
    database, 
    ...database.models
}