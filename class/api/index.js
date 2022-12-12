const { Router } = require('express');

const assignments = require('./assignments');
const courses = require('./courses');
const enrollments = require('./enrollments');
const lessons = require('./lessons');
const materials = require('./materials');
const progress = require('./progress');
const user = require('./user');

module.exports = context => {
    const router = Router();

    router.use('/assignments', assignments(context));
    router.use('/courses', courses(context));
    router.use('/enrollments', enrollments(context));
    router.use('/lessons', lessons(context));
    router.use('/materials', materials(context));
    router.use('/progress', progress(context));
    router.use('/user', user(context));

    return router;
};