const { Router } = require('express');

const Controller = require('./controller');

module.exports = context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/')
        .get(controller.get)
        .post(controller.create);

    router.route('/:id')
        .get(controller.getOne)
        .put(controller.update)
        .delete(controller.delete);

    router.route('/:id/schedule')
        .put(controller.updateSchedule);

    router.route('/:id/refund')
        .get(controller.getRefundLessons)
        .post(controller.refundLessons);

    return router;
};