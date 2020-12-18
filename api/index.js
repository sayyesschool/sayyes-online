const express = require('express');

const twilio = require('./twilio');
const yookassa = require('./yookassa');
const zoom = require('./zoom');

module.exports = context => {
    const api = express();

    api.use('/yookassa', yookassa(context.models));
    api.use('/twilio', twilio(context.lib.twilio));
    api.use('/zoom', zoom(context.models));

    api.use((error, req, res, next) => {
        console.log(error);

        res.status(500).send({ error: error.message || error });
    });

    return api;
};