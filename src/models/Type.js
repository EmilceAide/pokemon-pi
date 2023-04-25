const { DataTypes } = require('sequelize');


module.exports = (database) => {
 
  database.define('Type', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    }, 
    name: {
      type: DataTypes.ENUM('normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'shadow', 'unknown'),
      allowNull: false, 
    }

  },
  {
    timestamps: false
  });
};