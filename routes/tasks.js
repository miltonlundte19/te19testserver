const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res, next) => {
  await pool
    .promise()
    .query('SELECT * FROM tasks')
    .then((rows) => {
      console.log(rows);
      res.json(rows);
    });
});

module.exports = router;
