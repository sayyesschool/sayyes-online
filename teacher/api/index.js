const { Router } = require('express');

const lessons = require('./lessons');
const payments = require('./payments');
const user = require('./user');

module.exports = core => {
    const router = Router();

    router.use('/lessons', lessons(core.services));
    router.use('/payments', payments(core.services));
    router.use('/user', user(core.services));

    return router;
};