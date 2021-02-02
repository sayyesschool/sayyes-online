const { Router } = require('express');

const Controller = require('./controller');

module.exports = context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/')
        .get(controller.getMany);

    router.route('/:slug')
        .get(controller.getOne);

    return router;
};