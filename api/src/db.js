require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // establecer en console.log para ver las consultas SQL sin procesar
    native: false, // permite que Sequelize sepa que podemos usar pg-native para ~30% más de velocidad
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Ponemos mayusculas a los modelos
let entries = Object.entries(sequelize.models);
// devuelve array con pares de clave: valor de los modelos
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
// Nos devuelve el array con los modelos como objetos pero con La mayuscula aplicada
sequelize.models = Object.fromEntries(capsEntries);
// Convierte el arreglo en un objeto con clave valor -> Nombre del metodo : fn()

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un (destructuring

const { Activity, Country } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
// hasMany : tiene muchos
// belongs to : pertenece a
Country.belongsToMany(Activity, { through: 'Activities_Countries' });
Activity.belongsToMany(Country, { through: 'Activities_Countries' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
