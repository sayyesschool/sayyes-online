const { Router } = require('express');

const meetings = require('./meetings');

module.exports = context => {
    const router = Router();

    router.use('/meetings', meetings(context));

    router.use((error, req, res, next) => {
        console.error(error);
        res.status(error.status || 500).send({
            ok: false,
            error: typeof error === 'object' ? error.message : error
        });
    });

    return router;
};