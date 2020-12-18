const { Router } = require('express');

const Controller = require('./controller');

module.exports = context => {
    const router = Router();
    const controller = Controller(context.models);

    router.get('/', controller.getMany);

    return router;
};