const { Router } = require('express');

const router = Router();

router.get('/agreement', (req, res) =>
    res.render('shared/views/pages/agreement', {
        id: 'agreement',
        title: 'Пользовательское соглашение'
    })
);

router.get('/offer', (req, res) =>
    res.render('shared/views/pages/offer', {
        id: 'offer',
        title: 'Публичная оферта'
    })
);

router.get('/policy', (req, res) =>
    res.render('shared/views/pages/policy', {
        id: 'policy',
        title: 'Политика конфиденциальности'
    })
);

router.get('/rules', (req, res) =>
    res.render('shared/views/pages/rules', {
        id: 'rules',
        title: 'Правила оказания услуг'
    })
);

router.get('/zoom', (req, res) =>
    res.render('shared/views/pages/zoom', {
        id: 'zoom',
        title: 'Инструкция по пользованию Zoom'
    })
);

module.exports = router;