import { Router } from 'express';

import Controller from './controller';
import * as mappers from './mappers';

export default context => {
    const router = Router();
    const controller = Controller(context, mappers);

    router.get('/', controller.getMany);
    router.get('/:lessonId', controller.getOne);

    return router;
};