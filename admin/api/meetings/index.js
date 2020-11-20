const { Router } = require('express');

const Controller = require('./controller')

module.exports = core => {
    const router = Router();
    const controller = Controller(core.services);

    router.route('/')
        .get(controller.get)
        .post(controller.create);

    router.route('/:meetingId')
        .get(controller.getOne)
        .put(controller.update)
        .delete(controller.delete);

    router.route('/:meetingId/registrations')
        .post(controller.addRegistration);

    router.route('/:meetingId/registrations/:registrationId')
        .post(controller.approveRegistration)
        .put(controller.updateRegistration)
        .delete(controller.removeRegistration);

    return router;
};