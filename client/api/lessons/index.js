const { Router } = require('express');

const Controller = require('./controller');

module.exports = services => {
    const router = Router();
    const controller = Controller(services);

    router.param('lessonId', controller.findOne);

    router.get('/', controller.getMany);
    router.get('/:lessonId', controller.getOne);

    return router;
};