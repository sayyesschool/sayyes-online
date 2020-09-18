const { Router } = require('express');

const clients = require('./clients');
const enrollments = require('./enrollments');
const lessons = require('./lessons');
const managers = require('./managers');
const payments = require('./payments');
const requests = require('./requests');
const teachers = require('./teachers');
const users = require('./users');

module.exports = core => {
    const router = Router();

    router.use('/clients', clients(core));
    router.use('/enrollments', enrollments(core));
    router.use('/lessons', lessons(core));
    router.use('/managers', managers(core));
    router.use('/payments', payments(core));
    router.use('/requests', requests(core));
    router.use('/teachers', teachers(core));
    router.use('/users', users(core));

    router.use((error, req, res, next) => {
        res.status(error.status || 500).send({ ok: false, error: error.message || error });
    });

    return router;
};