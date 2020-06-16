const { Router } = require('express');

const router = Router();

router.get('/zoom', (req, res) =>
    res.render('shared/views/pages/zoom', {
        id: 'zoom',
        title: 'Инструкция по пользованию Zoom'
    })
);

module.exports = router;