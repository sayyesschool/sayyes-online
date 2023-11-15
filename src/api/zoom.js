const { Router } = require('express');

module.exports = ({
    models: { Meeting }
}) => {
    const router = Router();

    router.post('/meetings', (req, res, next) => {
        const event = req.body.event;
        const data = req.body.payload?.object;

        switch (event) {
            case 'meeting.started':
                Meeting.updateOne({
                    zoomId: data.id
                }, {
                    status: 'started'
                }).catch(next);
                break;

            case 'meeting.ended':
                Meeting.updateOne({
                    zoomId: data.id,
                    date: { $lt: new Date() }
                }, {
                    status: 'ended'
                }).catch(next);
                break;

            case 'meeting.participant_joined':
                Meeting.updateOne({
                    zoomId: data.id,
                    'registrations.zoomId': data.participant.registrant_id
                }, {
                    $set: { 'registrations.$.participated': true }
                }).catch(next);
                break;
        }

        res.status(200).send();
    });

    return router;
};