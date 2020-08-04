const { Router } = require('express');

const account = require('./account');
const lessons = require('./lessons');
const payments = require('./payments');

module.exports = core => {
    const router = Router();

    router.use('/account', account(core.services));
    router.use('/lessons', lessons(core.services));
    router.use('/payments', payments(core.services));

    return router;
};