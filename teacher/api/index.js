const { Router } = require('express');

const assignments = require('./assignments');
const courses = require('./courses');
const enrollments = require('./enrollments');
const lessons = require('./lessons');
const materials = require('./materials');
const payments = require('./payments');
const posts = require('./posts');
const user = require('./user');

module.exports = core => {
    const router = Router();

    router.use('/assignments', assignments(core));
    router.use('/courses', courses(core));
    router.use('/enrollments', enrollments(core));
    router.use('/lessons', lessons(core));
    router.use('/materials', materials(core));
    router.use('/payments', payments(core));
    router.use('/posts', posts(core));
    router.use('/user', user(core));

    router.use((req, res) => {
        res.status(404).send({ ok: false, error: 'Не найдено' });
    });

    router.use((error, req, res, next) => {
        console.error(error);
        res.status(error.status || 500).send({
            ok: false,
            error: typeof error === 'object' ? error.message : undefined
        });
    });

    return router;
};