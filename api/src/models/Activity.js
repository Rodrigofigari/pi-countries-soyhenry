const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'activity',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
          max: 5,
        },
      },
      time: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      season: {
        type: DataTypes.ENUM,
        values: ['Summer', 'Autumn', 'Winter', 'Spring'],
        lowercase: true,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
