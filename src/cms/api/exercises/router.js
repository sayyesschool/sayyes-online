const { Router } = require('express');

const Controller = require('./controller');

module.exports = context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/:exercise')
        .get(controller.getExercise)
        .post(controller.createExercise)
        .put(controller.updateExercise)
        .delete(controller.deleteExercise);

    router.route('/:exercise/items/:item?')
        .post(controller.createItem)
        .put(controller.updateItem)
        .delete(controller.deleteItem);

    return router;
};