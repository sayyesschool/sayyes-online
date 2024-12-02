import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/')
        .get(controller.get);

    router.route('/:id')
        .get(controller.getOne);

    return router;
};