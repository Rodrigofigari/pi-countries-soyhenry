const { Router } = require('express');
const { postActivity, getActivities } = require('./controllersActivity.js');

const router = Router();

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const newActivity = await postActivity(req.body);
    return res.status(201).json('Activity created ✔️');
  } catch (error) {
    return res
      .status(412)
      .json('Failed activity creation ❌. Activity created');
  }
});

router.get('/', async (req, res) => {
  try {
    const activities = await getActivities();
    // const obj = activities.map((ele) => {});
    return res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
