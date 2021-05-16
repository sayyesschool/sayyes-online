const { Router } = require('express');

const Controller = require('./controller');

module.exports = context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/')
        .get(controller.getMany)
        .post(controller.create);

    router.route('/:id')
        .get(controller.getOne)
        .put(controller.update)
        .delete(controller.delete);

    router.route('/:id/comments')
        .post(controller.createComment);

    router.route('/:postId/comments/:commentId')
        .put(controller.updateComment)
        .delete(controller.deleteComment);

    return router;
};