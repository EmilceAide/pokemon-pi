const { DataTypes } = require('sequelize');


module.exports = (database) => {
 
  database.define('Type', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
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