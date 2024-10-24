import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/')
        .get(controller.get)
        .post(controller.create);

    router.route('/:payment')
        .get(controller.getOne)
        .put(controller.update)
        .patch(controller.resolve)
        .delete(controller.delete);

    return router;
};