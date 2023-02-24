const { Router } = require('express');

const Controller = require('./controller');

module.exports = context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/')
        .get(controller.get)
        .post(controller.create);

    router.route('/:ticketId')
        .get(controller.getOne)
        .put(controller.update)
        .delete(controller.delete);

    return router;
};