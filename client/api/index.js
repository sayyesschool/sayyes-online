const { Router } = require('express');

const account = require('./account');
const enrollments = require('./enrollments');
const lessons = require('./lessons');
const payments = require('./payments');
const quizzes = require('./quizzes');

module.exports = core => {
    const router = Router();

    router.use('/account', account(core.services));
    router.use('/enrollments', enrollments(core.services));
    router.use('/lessons', lessons(core.services));
    router.use('/payments', payments(core.services));
    router.use('/quizzes', quizzes(core.services));

    return router;
};