import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/')
        .get(controller.get)
        .post(controller.create);

    router.route('/:id')
        .get(controller.getOne)
        .patch(controller.update)
        .delete(controller.delete);

    return router;
};