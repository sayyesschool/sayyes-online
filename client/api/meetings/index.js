const { Router } = require('express');

const mapTicket = require('../tickets/mapper');
const Controller = require('./controller');
const mapMeeting = require('./mapper');

module.exports = context => {
    const router = Router();
    const controller = Controller(context.models, context.services, { mapMeeting, mapTicket });

    router.param('meetingId', controller.find);

    router.get('/', controller.getMany);
    router.get('/:meetingId', controller.getOne);
    router.post('/:meetingId/registration', controller.register);
    router.delete('/:meetingId/registration', controller.unregister);

    return router;
};