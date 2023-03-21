const { Router } = require('express');
const axios = require('axios');
const { Country } = require('../../db.js');

const {
  insertInfoInDB,
  getById,
  getByParams,
  getFindAll,
} = require('./controllersCountry.js');

const router = Router();

/*
(async function validationDB() {
  const db = await Country.findAll();
  !db.length ? insertInfoInDB() : null;
})();*/

// router.get('/axios', async (req, res) => {
//   const result = await axios.get('https://restcountries.com/v3/all');
//   console.log('result', result.data);
//   res.send(result.data);
// });

router.get('/dbfull', async (req, res) => {
  console.log('hola');
  try {
    await insertInfoInDB();
    console.log('insertinfodb', insertInfoInDB);
    res.status(200).send('Db llena');
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  const { name } = req.query;
  if (name) {
    try {
      const response = await getByParams(name);
      response.length
        ? res.status(200).json(response)
        : res.status(404).json('Country not found ❌');
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  } else {
    try {
      const response = await getFindAll();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
});

// Lo mismo aca con el catch
router.get('/:idPais', async (req, res) => {
  const { idPais } = req.params;

  try {
    const response = await getById(idPais);
    response
      ? res.status(200).json(response)
      : res
          .status(404)
          .json({ error: `Country not found whit code ${idPais}` });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;

// router.get('/', async (req, res) => {
//   const { name } = req.query;
// if (name) {
//   try{
//      return getByParams(name)
//     .then(result => {
//       result.length
//       ? res.status(200).json(result)
//       : res.status(400).josn('Country not found')
//     })
//   } catch(error) {
//     return res.status(404).json({ error: error.message })
//   }
// } else {
//   try {
//      getFindAll()
//      .then(result => res.status(200).json(result))
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// }
// })
