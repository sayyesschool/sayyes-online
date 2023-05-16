const { Router } = require('express');

const Controller = require('./controller');

module.exports = context => {
    const router = Router();
    const controller = Controller(context);

    router.get('/', controller.getMany);
    router.get('/:id', controller.getOne);
    router.put('/:id', controller.update);

    return router;
};