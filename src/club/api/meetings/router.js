import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/')
        .get(controller.getMany)
        .post(controller.create);

    router.get('/:meetingId/join', controller.join);
    router.get('/:meetingId/start', controller.start);

    router.route('/:meetingId')
        .get(controller.getOne)
        .put(controller.update)
        .delete(controller.delete);

    router.route('/:meetingId/registrations{/:registrationId}')
        .post(controller.createRegistration)
        .patch(controller.updateRegistration)
        .delete(controller.deleteRegistration);

    return router;
};