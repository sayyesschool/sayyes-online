const { Router } = require('express');

const courses = require('./courses');
const courses_v2 = require('./courses_v2');
const exercises = require('./exercises');
const materials = require('./materials');
const user = require('./user');

module.exports = context => {
    const router = Router();

    router.use('/courses', courses(context));
    router.use('/v2/courses', courses_v2(context));
    router.use('/exercises', exercises(context));
    router.use('/materials', materials(context));
    router.use('/user', user(context));

    router.use((error, req, res, next) => {
        console.error(error);
        res.status(error.status || 500).send({ ok: false, error: error.message || error });
    });

    return router;
};