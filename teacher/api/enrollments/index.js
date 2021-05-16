const { Router } = require('express');

const Controller = require('./controller');

module.exports = core => {
    const router = Router();
    const controller = Controller(core.models, core.services);

    router.get('/', controller.getMany);

    router.route('/:id')
        .get(controller.getOne)
        .put(controller.update);

    return router;
};