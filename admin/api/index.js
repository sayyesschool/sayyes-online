const { Router } = require('express');

const lessons = require('./lessons');
const payments = require('./payments');
const requests = require('./requests');
const students = require('./students');
const teachers = require('./teachers');
const users = require('./users');

module.exports = core => {
    const router = Router();

    router.use('/lessons', lessons(core));
    router.use('/payments', payments(core));
    router.use('/requests', requests(core));
    router.use('/students', students(core));
    router.use('/teachers', teachers(core));
    router.use('/users', users(core));

    router.use((error, req, res, next) => {
        res.status(error.status || 500).send({ ok: false, error: error.message || error });
    });

    return router;
};