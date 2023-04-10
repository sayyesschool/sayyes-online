const { Router } = require('express');

const error = require('./error');
const notFound = require('./not-found');

module.exports = context => {
    const router = Router();

    router.use(notFound);
    router.use(error);

    return router;
};