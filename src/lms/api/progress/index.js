const { Router } = require('express');

const Controller = require('./controller');

module.exports = context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/:progress?')
        .get(controller.get)
        .post(controller.upsert)
        .delete(controller.delete);

    return router;
};