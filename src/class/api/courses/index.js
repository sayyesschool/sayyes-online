import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context.models);

    router.get('/:courseId', controller.getOne);

    return router;
};