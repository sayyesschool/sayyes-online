const { Router } = require('express');

const Controller = require('./controller');

module.exports = core => {
    const router = Router();
    const controller = Controller(core.models, core.services);

    router.route('/')
        .get(controller.getMany);

    router.route('/:id')
        .get(controller.getOne);

    return router;
};