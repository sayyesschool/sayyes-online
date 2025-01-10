import { Router } from 'express';

import data from './data';

export const routes = [
    '/agreement',
    '/offer',
    '/policy',
    '/rules',
    '/zoom'
];

export default ({
    services: { Club }
}) => {
    const router = Router();

    router.get('/', async (req, res) => {
        const packs = await Club.getPacks();
        const meetings = await Club.findMeetings({
            status: { $nin: ['canceled', 'ended'] }
        }).sort({ date: 1 });

        res.render('pages/views/main', {
            trialPack: packs[0],
            packs,
            meetings,
            ...data
        });
    });

    router.get('/agreement', (req, res) =>
        res.render('pages/views/agreement', {
            id: 'agreement',
            title: 'Пользовательское соглашение',
            data
        })
    );

    router.get('/offer', (req, res) =>
        res.render('pages/views/offer', {
            id: 'offer',
            title: 'Публичная оферта',
            data
        })
    );

    router.get('/policy', (req, res) =>
        res.render('pages/views/policy', {
            id: 'policy',
            title: 'Политика конфиденциальности',
            data
        })
    );

    router.get('/rules', (req, res) =>
        res.render('pages/views/rules', {
            id: 'rules',
            title: 'Правила оказания услуг',
            data
        })
    );

    router.get('/zoom', (req, res) =>
        res.render('pages/views/zoom', {
            id: 'zoom',
            title: 'Инструкция по пользованию Zoom',
            data
        })
    );

    return router;
};