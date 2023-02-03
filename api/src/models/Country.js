const { DataTypes, STRING } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'country',
    {
      id: {
        type: DataTypes.STRING(3),
        primaryKey: true,
        // lowercase: true,
      },
      name: {
        // type: DataTypes.ARRAY(STRING), >> Intente traerme los name en ingles y espaol para que se ppueda buscar de ambas maneras, se rompio por un map interno de sequelize!
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgFlag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      continent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subregion: {
        type: DataTypes.STRING,
      },
      area: {
        type: DataTypes.FLOAT,
        get() {
          let area = this.getDataValue('area');
          area = area.toLocaleString('es-ES', { maximumFractionDigits: 2 });
          return `${area} KM2`;
        },
      },
      population: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );
};
