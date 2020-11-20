const { Router } = require('express');

const courses = require('./courses');
const enrollments = require('./enrollments');
const lessons = require('./lessons');
const payments = require('./payments');
const user = require('./user');

module.exports = core => {
    const router = Router();

    router.use('/courses', courses(core.services));
    router.use('/enrollments', enrollments(core.services));
    router.use('/lessons', lessons(core.services));
    router.use('/payments', payments(core.services));
    router.use('/user', user(core.services));

    return router;
};