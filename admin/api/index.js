const { Router } = require('express');

const lessons = require('./lessons');
const payments = require('./payments');
const users = require('./users');

module.exports = core => {
    const router = Router();

    router.use('/lessons', lessons(core));
    router.use('/payments', payments(core));
    router.use('/users', users(core));

    router.use((error, req, res, next) => {
        res.status(error.status || 500).send({ ok: false, error: error.message || error });
    });

    return router;
};