import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.get('/', controller.getMany);
    //router.post('/', controller.create);

    return router;
};