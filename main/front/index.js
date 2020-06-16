const { Router } = require('express');

const Controller = require('./controller');

module.exports = (services) => {
    const router = Router();
    const controller = Controller(services);

    router.get('/', controller.showFront);
    router.post('/request', controller.request);
    router.post('/contact', controller.contact);

    return router;
};