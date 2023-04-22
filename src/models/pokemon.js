const { DataTypes } = require('sequelize');


module.exports = (database) => {
 
  database.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      primaryKey: true
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true
    }, 
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hp:{
      type: DataTypes.INTEGER
    },
    attack: {
      type: DataTypes.INTEGER
    }, 
    defense: {
      type: DataTypes.INTEGER
    }, 
    speed: {
      type: DataTypes.INTEGER
    }, 
    height: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    }, 
    type: {
      type: DataTypes.INTEGER,
      allowNull: false 
    }

  });
};