import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/:exercise')
        .get(controller.getExercise)
        .post(controller.createExercise)
        .put(controller.updateExercise)
        .delete(controller.deleteExercise);

    router.route('/:exercise/items{/:item}')
        .post(controller.createItem)
        .put(controller.updateItem)
        .delete(controller.deleteItem);

    return router;
};