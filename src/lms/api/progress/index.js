import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/{:progress}')
        .get(controller.get)
        .post(controller.upsert)
        .delete(controller.delete);

    return router;
};