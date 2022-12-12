const { Router } = require('express');

const Controller = require('./controller');

module.exports = context => {
    const router = Router();
    const controller = Controller(context);

    router.get('/', controller.getMany);
    router.get('/:id', controller.getOne);

    router.route('/:course/exercises/:exercise/comments/:comment?')
        .post(controller.createExerciseComment)
        .put(controller.updateExerciseComment)
        .delete(controller.deleteExerciseComment);

    return router;
};