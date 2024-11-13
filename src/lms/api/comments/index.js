import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/{:id}')
        .get(controller.get)
        .post(controller.create)
        .put(controller.update)
        .delete(controller.delete);

    return router;
};