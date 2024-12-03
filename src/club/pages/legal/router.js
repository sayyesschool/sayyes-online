import * as data from './data';

export default (context, router) => {
    router.get('/agreement', (req, res) =>
        res.render('pages/legal/agreement', {
            id: 'agreement',
            title: 'Пользовательское соглашение',
            data
        })
    );

    router.get('/offer', (req, res) =>
        res.render('pages/legal/offer', {
            id: 'offer',
            title: 'Публичная оферта',
            data
        })
    );

    router.get('/policy', (req, res) =>
        res.render('pages/legal/policy', {
            id: 'policy',
            title: 'Политика конфиденциальности',
            data
        })
    );

    router.get('/rules', (req, res) =>
        res.render('pages/legal/rules', {
            id: 'rules',
            title: 'Правила оказания услуг',
            data
        })
    );

    router.get('/zoom', (req, res) =>
        res.render('pages/legal/zoom', {
            id: 'zoom',
            title: 'Инструкция по пользованию Zoom',
            data
        })
    );
};