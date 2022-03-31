const { Router } = require('express');

const Controller = require('./controller');
const Middleware = require('./middleware');

module.exports = context => {
    const router = Router();
    const controller = Controller(context);
    const { resolveScheduleConflict } = Middleware(context);

    router.route('/')
        .get(controller.get)
        .post(resolveScheduleConflict, controller.create);

    router.route('/:lessonId')
        .get(controller.getOne)
        .put(resolveScheduleConflict, controller.update)
        .delete(controller.delete);

    return router;
};