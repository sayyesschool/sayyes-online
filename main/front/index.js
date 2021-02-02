const { Router } = require('express');

const Controller = require('./controller');

module.exports = context => {
    const router = Router();
    const controller = Controller(context);

    router.get('/', controller.showFront);
    router.post('/request', controller.request);
    router.post('/contact', controller.contact);

    return router;
};