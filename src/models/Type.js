const { DataTypes } = require('sequelize');


module.exports = (database) => {
 
  database.define('Type', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      primaryKey: true
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true
    }

  },
  {
    timestamps: false
  });
};