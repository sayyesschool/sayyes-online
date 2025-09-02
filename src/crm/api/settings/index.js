import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/')
        .get(controller.getAll);

    router.route('/:key')
        .get(controller.get)
        .put(controller.set);

    return router;
};