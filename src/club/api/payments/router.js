import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.post('/', controller.create);
    router.post('/process', controller.process);

    return router;
};