const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res, next) => {
    await pool
        .promise()
        .query('SELECT * FROM tasks')
        .then(([rows, fields]) => {
            console.log(rows);
            res.json({
                tasks: {
                    data: rows
                }
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

router.get('/:id', async (req, res, next) => {
    // const id = req.params.id;

    if (isNaN(req.params.id)) {
        res.status(400).json({
            task: {
                error: 'Bad request'
            }
        });
    }

    console.log(req.params.id);
    res.json({
        id: req.params.id
    });
});

module.exports = router;
