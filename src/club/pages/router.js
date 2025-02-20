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
            status: 'scheduled'
        })
            .populate('host', 'firstname lastname email')
            .sort({ date: 1 });

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
            noIndex: true,
            data
        })
    );

    router.get('/offer', (req, res) =>
        res.render('pages/views/offer', {
            id: 'offer',
            title: 'Публичная оферта',
            noIndex: true,
            data
        })
    );

    router.get('/policy', (req, res) =>
        res.render('pages/views/policy', {
            id: 'policy',
            title: 'Политика конфиденциальности',
            noIndex: true,
            data
        })
    );

    router.get('/rules', (req, res) =>
        res.render('pages/views/rules', {
            id: 'rules',
            title: 'Правила оказания услуг',
            noIndex: true,
            data
        })
    );

    router.get('/zoom', (req, res) =>
        res.render('pages/views/zoom', {
            id: 'zoom',
            title: 'Инструкция по пользованию Zoom',
            noIndex: true,
            data
        })
    );

    return router;
};