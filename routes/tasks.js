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
    const id = req.params.id;

    if (isNaN(req.params.id)) {
        res.status(400).json({
            task: {
                error: 'Bad request'
            }
        });
    }

    await pool
        .promise()
        .query('SELECT * FROM tasks WHERE id = ?', [id])
        .then(([rows, fields]) => {
            res.json({
                task: {
                    data: rows
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                tasks: {
                    error: 'Error getting tasks'
                }
            });
        });
});

router.post('/', async (req, res, next) => {
    const task = req.body.task;
    await pool
        .promise()
        .query('INSERT INTO tasks (task) VALUES (?)', [task])
        .then((respons) => {
            res.json({
                tasks: {
                    data: respons
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

router.delete('/:id/delete', async (req, res, next) => {
    const id = req.params.id;

    if (isNaN(req.params.id)) {
        res.status(400).json({
            task: {
                error: 'Bad request'
            }
        });
    }

    await pool
        .promise()
        .query('DELETE FROM tasks WHERE id = ?', [id])
        .then((respons) => {
            res.json({
                tasks: {
                    data: respons
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

module.exports = router;
