import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.get('/', controller.getMany);
    router.get('/:id', controller.getOne);
    router.post('/:id/pay', controller.pay);

    return router;
};