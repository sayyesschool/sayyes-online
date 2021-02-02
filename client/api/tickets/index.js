const { Router } = require('express');
const Controller = require('./controller');
const map = require('./mapper');

module.exports = context => {
    const router = Router();
    const controller = Controller(context);

    router.get('/', controller.get);
    router.get('/active', controller.getOne);
    router.post('/', controller.buy);

    return router;
};