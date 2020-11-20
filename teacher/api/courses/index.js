const { Router } = require('express');

const Controller = require('./controller');

module.exports = services => {
    const router = Router();
    const controller = Controller(services);

    router.route('/:id')
        .get(controller.getOne);

    return router;
};