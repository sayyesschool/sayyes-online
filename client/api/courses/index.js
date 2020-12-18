const { Router } = require('express');

const Controller = require('./controller');

module.exports = context => {
    const router = Router();
    const controller = Controller(context.models);

    router.route('/:id')
        .get(controller.getOne);

    return router;
};