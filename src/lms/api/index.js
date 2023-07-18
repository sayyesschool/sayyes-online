const { Router } = require('express');

const courses = require('./courses');
const enrollments = require('./enrollments');
const lessons = require('./lessons');
const materials = require('./materials');
const posts = require('./posts');
const progress = require('./progress');

module.exports = context => {
    const router = Router();

    router.use('/enrollments', enrollments(context));
    router.use('/courses', courses(context));
    router.use('/lessons', lessons(context));
    router.use('/materials', materials(context));
    router.use('/posts', posts(context));
    router.use('/progress', progress(context));

    router.use((error, req, res, next) => {
        console.error(error);
        res.status(error.status || 500).send({
            ok: false,
            error: typeof error === 'object' ? error.message : error
        });
    });

    return router;
};