const { Router } = require('express');

const data = require('./data.json');

const router = Router();

router.get('/', (req, res) => {
    res.render('views/pages/index', data);
});

module.exports = router;