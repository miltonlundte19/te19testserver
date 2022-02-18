const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res, next) => {
    await pool
        .promise()
        .query('SELECT * FROM tasks')
        .then(([rows, fields]) => {
            console.log(rows);
            res.render('tasks.njk', {
                tasks: rows,
                title: 'Tasks',
                layout: 'layout.njk'
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                task: {
                    errpr: 'Errpr gettomg tasls'
                }
            });
        });
});

module.exports = router;
