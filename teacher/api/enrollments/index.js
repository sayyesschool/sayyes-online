const { Router } = require('express');

const Controller = require('./controller');

module.exports = services => {
    const router = Router();
    const controller = Controller(services);

    router.param('id', controller.findOne);

    router.get('/', controller.getMany);

    router.route('/:id')
        .get(controller.getOne);

    return router;
};