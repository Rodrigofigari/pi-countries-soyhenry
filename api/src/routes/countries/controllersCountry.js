const axios = require('axios');
const { Country, Activity } = require('../../db.js');
const { Op } = require('sequelize');

// Busca la data en la API y llena la DB
const insertInfoInDB = async () => {
  const result = await axios
    .get('https://restcountries.com/v3/all')
    .then((value) => value.data);

  const newResult = result.map((c) => {
    return {
      id: c.cca3,
      // name: [c.translations.spa.common, c.name.common], Tener español e ingles
      name: c.name.common,
      imgFlag: c.flags[0],
      continent: c.continents[0],
      capital: c.capital ? c.capital[0] : 'Capital not found',
      subregion: c.subregion ? c.subregion : 'Subregion not found',
      area: c.area,
      population: c.population,
    };
  });

  await Country.bulkCreate(newResult);
};

// const fn = () => {
//   fetch('https://restcountries.com/v3/all').data
//   .then(result => result.map((c) => {
//     return {
//       id: c.cca3,
//       // name: [c.translations.spa.common, c.name.common],
//       name: c.name.common,
//       imgFlag: c.flags[0],
//       continent: c.continents[0],
//       capital: c.capital ? c.capital[0] : 'Capital not found',
//       subregion: c.subregion ? c.subregion : 'Subregion not found',
//       area: c.area,
//       population: c.population,
//     };
//   }))
//   .then(countries => Country.bulkCreate(countries))
//   .catch(error => return(error.message))
// }

// Busca por primary key CODE
const getById = async (id) => {
  id = id.toUpperCase();
  const country = await Country.findByPk(id, {
    include: [
      {
        model: Activity,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return country;
};

// const getByid2 = (id) => {
//   id = id.toUpperCase()
//   return Country.findByPk(id, {
//     include: [
//       {
//         model: Activity,
//         attributes: ['name'],
//         through: {
//           attributes: [],
//         },
//       },
//     ],
//   })
//   .then(result => {return result})
// }

// Busca por params, name que contenga el string
const getByParams = async (name) => {
  const response = await Country.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  return response;
};

// Busca todos, findAll
const getFindAll = async () => {
  const response = await Country.findAll();
  return response;
};

module.exports = {
  insertInfoInDB,
  getById,
  getByParams,
  getFindAll,
};
