const { Router } = require('express');
const { Country } = require('../../db.js');

const {
  insertInfoInDB,
  getById,
  getByParams,
  getFindAll,
} = require('./controllersCountry.js');

const router = Router();

(async function validationDB() {
  const db = await Country.findAll();
  !db.length ? insertInfoInDB() : null;
})();

// function validationDB() {
//   return Country.findAll()
//   .then(db => {
//      if (!db.length) {
//        return insertInfoInDB();
//      }
//   })
//   .then(() => {
//      console.log("DB validation completed");
//   })
//   .catch(err => {
//      console.error(err);
//   });
// }

//   validationDB();

router.get('/', async (req, res) => {
  const { name } = req.query;
  if (name) {
    // puedo sacar el primer 404 y dejar que el catch actue
    try {
      const response = await getByParams(name);
      response.length
        ? res.status(200).json(response)
        : res.status(404).json('Country not found ❌');
    } catch (error) {
      return res.status(404).json({ error: error.message }); // El cath agarra el error devuelto en el try
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
