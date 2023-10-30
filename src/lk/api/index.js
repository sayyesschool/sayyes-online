const { Router } = require('express');

const enrollments = require('./enrollments');
const lessons = require('./lessons');
const meetings = require('./meetings');
const packs = require('./packs');
const payments = require('./payments');
const posts = require('./posts');
const user = require('./user');

module.exports = context => {
    const router = Router();

    router.use('/courses*', redirectToCMS);
    router.use('/materials*', redirectToCMS);

    router.use('/enrollments', enrollments(context));
    router.use('/lessons', lessons(context));
    router.use('/meetings', meetings(context));
    router.use('/packs', packs(context));
    router.use('/payments', payments(context));
    router.use('/posts', posts(context));
    router.use('/user', user(context));

    router.use((error, req, res, next) => {
        console.error(error);
        res.status(error.status || 500).send({
            ok: false,
            error: typeof error === 'object' ? error.message : error
        });
    });

    return router;
};

function redirectToCMS(req, res) {
    res.redirect(req.originalUrl.replace('learner', 'cms'));
}