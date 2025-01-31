import { Router } from 'express';

export default ({ models: { Data } }) => {
    const router = Router();

    router.get('/', async (req, res) => {
        const data = await Data.get('pay.packs');

        res.render('pages/views/main', { data });
    });

    router.get('/offer', (req, res) =>
        res.render('pages/views/offer', {
            id: 'offer',
            title: 'Публичная оферта'
        })
    );

    router.get('/policy', (req, res) =>
        res.render('pages/views/policy', {
            id: 'policy',
            title: 'Политика конфиденциальности'
        })
    );

    return router;
};