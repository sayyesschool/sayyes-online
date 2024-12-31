import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.get('/', controller.getMany);
    router.get('/options', controller.getOptions);
    router.get('/{:id}', controller.getOne);

    router.post('/', controller.create);
    router.post('/process', controller.process);

    return router;
};