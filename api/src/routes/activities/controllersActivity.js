const { Activity, Country } = require('../../db.js');
// const { Op } = require('sequelize');

// Crea actividad y enlaza con los paises
const postActivity = async (objeto) => {
  const { name, difficulty, time, season } = objeto;
  let { countries } = objeto;
  countries = countries.map((c) => c.toUpperCase());

  const newActivity = await Activity.create({
    name,
    difficulty,
    time,
    season,
  });

  await newActivity.addCountries(countries); // vinculamos por primary key >> Id >> CODE
  return newActivity;
};

const getActivities = async () => {
  const response = await Activity.findAll({
    include: [
      {
        model: Country,
        attributes: ['name', 'id', 'imgFlag', 'continent'],
        // seteo los atributos que quiero de la tabla countries
        through: {
          attributes: [], // le digo que no me traiga ningun atributo de la tabla intermedia, de no ponerlo me lo trae por default
        },
      },
    ],
  });
  return response;
};

module.exports = {
  postActivity,
  getActivities,
};

// const newActivity = await Activity.findOrCreate({
//   where: { name: `${name}` },
//   defaults: {
//     difficulty: difficulty,
//     time: `${time}`,
//     season: `${season}`,
//   },
//   include: [
//     {
//       model: Country,
//       where: { id: `'${countries}'` },
//     },
//   ],
// });
