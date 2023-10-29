const { Router } = require('express');

const Controller = require('./controller');
const mappers = require('./mappers');

module.exports = context => {
    const router = Router();
    const controller = Controller(context, mappers);

    router.get('/', controller.getMany);
    router.get('/:lessonId', controller.getOne);

    return router;
};