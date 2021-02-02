const { Router } = require('express');

const Controller = require('./controller');

module.exports = context => {
    const router = Router();
    const controller = Controller(context);

    router.get('/', controller.getMany);
    router.post('/', controller.create);

    return router;
};