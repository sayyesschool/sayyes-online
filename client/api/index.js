const { Router } = require('express');

const assignments = require('./assignments');
const courses = require('./courses');
const enrollments = require('./enrollments');
const lessons = require('./lessons');
const materials = require('./materials');
const meetings = require('./meetings');
const payments = require('./payments');
const posts = require('./posts');
const user = require('./user');

module.exports = context => {
    const router = Router();

    router.use('/assignments', assignments(context));
    router.use('/courses', courses(context));
    router.use('/enrollments', enrollments(context));
    router.use('/lessons', lessons(context));
    router.use('/materials', materials(context));
    router.use('/meetings', meetings(context));
    router.use('/payments', payments(context));
    router.use('/posts', posts(context));
    router.use('/user', user(context));

    router.use((error, req, res, next) => {
        console.error(error);
        res.status(error.status || 500).send({ ok: false, error: error.message || error });
    });

    return router;
};