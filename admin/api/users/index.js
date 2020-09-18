const { Router } = require('express');

const Controller = require('./controller');

module.exports = core => {
    const router = Router();
    const controller = Controller(core.services);

    router.route('/')
        .get(controller.get)
        .post(controller.create);

    router.route('/me')
        .get(controller.getMe)
        .put(controller.update);

    router.route('/:id')
        .get(controller.getOne)
        .patch(controller.update)
        .delete(controller.delete);

    return router;
};