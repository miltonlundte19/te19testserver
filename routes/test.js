const express = require('express');
const router = express.Router();

/* GET test page. */
router.get('/', function (req, res, next) {
    res.send('Denna route finns på /test/');
});

module.exports = router;
