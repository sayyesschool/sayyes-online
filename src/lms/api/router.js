const { Router } = require('express');

const assignments = require('./assignments');
const comments = require('./comments');
const courses = require('./courses');
const enrollments = require('./enrollments');
const exercises = require('./exercises');
const lessons = require('./lessons');
const materials = require('./materials');
const progress = require('./progress');

module.exports = context => {
    const router = Router();

    router.use('/assignments', assignments(context));
    router.use('/comments', comments(context));
    router.use('/courses', courses(context));
    router.use('/enrollments', enrollments(context));
    router.use('/exercises', exercises(context));
    router.use('/lessons', lessons(context));
    router.use('/materials', materials(context));
    router.use('/progress', progress(context));

    router.use((error, req, res, next) => {
        console.error(error);
        res.status(error.code || error.status || 500).send({
            ok: false,
            error: typeof error === 'object' ? error.message : error
        });
    });

    return router;
};