const { Router } = require('express');

const courses = require('./courses');
const enrollments = require('./enrollments');
const progress = require('./progress');

module.exports = context => {
    const router = Router();

    router.use('/courses', courses(context));
    router.use('/enrollments', enrollments(context));
    router.use('/progress', progress(context));
    router.use('/user*', (req, res) => res.redirect(req.originalUrl.replace('class', req.user.role)));

    router.use((error, req, res, next) => {
        res.status(error.status || 500).send({
            ok: false,
            error: typeof error === 'object' ? error.message : undefined
        });
    });

    return router;
};