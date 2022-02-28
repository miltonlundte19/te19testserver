const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res, next) => {
    await pool
        .promise()
        .query('SELECT * FROM tasks ORDER BY updated_at DESC')
        .then(([rows, fields]) => {
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

router.post('/', async (req, res, next) => {
    const task = req.body.task;

    if (task.length < 3) {
        res.status(400).json({
            task: {
                error: 'Bad request'
            }
        });
    }
    await pool
        .promise()
        .query('INSERT INTO tasks (task) VALUES (?)', [task])
        .then((respons) => {
            console.log(respons[0].affectedRows);
            if (respons[0].affectedRows === 1) {
                res.redirect('/tasks');
            } else {
                res.status(400).json({
                    task: {
                        error: 'Bad request'
                    }
                });
            }
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
        return res.status(400).json({
            task: {
                error: 'Bad request'
            }
        });
    }

    await pool
        .promise()
        .query('DELETE FROM tasks WHERE id = ?', [id])
        .then((respons) => {
            if (respons[0].affectedRows === 1) {
                res.redirect('/tasks');
            } else {
                res.status(400).redirect('/tasks');
            }
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
