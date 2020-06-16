const express = require('express');

const yandexKassa = require('./yandex-kassa');

module.exports = core => {
    const api = express();

    api.use('/yandex-kassa', yandexKassa(core.services));

    api.use((error, req, res, next) => {
        res.status(500).send({ error: error.message });
    });

    return api;
};