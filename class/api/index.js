const { Router } = require('express');

const courses = require('./courses');
const enrollments = require('./enrollments');
const lessons = require('./lessons');
const user = require('./user');

module.exports = context => {
    const router = Router();

    router.use('/courses', courses(context));
    router.use('/enrollments', enrollments(context));
    router.use('/lessons', lessons(context));
    router.use('/user', user(context));

    return router;
};