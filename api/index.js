const express = require('express');

const twilio = require('./twilio');
const yandexKassa = require('./yandex-kassa');

module.exports = core => {
    const api = express();

    api.use('/yandex-kassa', yandexKassa(core.services));
    api.use('/twilio', twilio(core.lib.twilio));

    api.use((error, req, res, next) => {
        console.log(error);
        res.status(500).send({ error: error.message || error });
    });

    return api;
};