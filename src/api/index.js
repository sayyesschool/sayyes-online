const express = require('express');
const vhost = require('vhost');

const storage = require('./storage');
const twilio = require('./twilio');
const yookassa = require('./yookassa');
const zoom = require('./zoom');

module.exports = context => {
    const api = express();

    api.use('/storage', context.middleware.auth.authenticatedRoute, storage(context));
    api.use('/twilio', twilio(context));
    api.use('/yookassa', yookassa(context));
    api.use('/zoom', zoom(context));

    api.use((error, req, res, next) => {
        console.log(error);

        res.status(500).send({ error: error.message || error });
    });

    return vhost(`api.${context.config.APP_DOMAIN}`, api);
};