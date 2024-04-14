import { Router } from 'express';

import Controller from './controller';
import * as mappers from './mappers';

export default context => {
    const router = Router();
    const controller = Controller(context, mappers);

    router.param('meetingId', controller.find);

    router.get('/', controller.getMany);
    router.get('/:meetingId', controller.getOne);
    router.post('/:meetingId/registration', controller.register);
    router.delete('/:meetingId/registration', controller.unregister);

    return router;
};