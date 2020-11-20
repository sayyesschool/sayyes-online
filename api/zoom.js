const { Router } = require('express');

module.exports = ({ Meeting }) => {
    const router = Router();

    router.post('/meetings', (req, res, next) => {
        const event = req.body.event;
        const data = req.body.payload.object;
        console.log(event, data);
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
                    date: { $lt: new Date() },
                    zoomId: data.id
                }, {
                    status: 'ended'
                }).catch(next);
                break;

            case 'meeting.participant_joined':
                Meeting.findOne({ zoomId: data.id })
                    .then(meeting => {
                        if (!meeting) return;

                        const registration = meeting.registrations.find(r => r.zoomId === data.participant.id);

                        if (registration) {
                            meeting.participants.addToSet(registration.user);
                            return meeting.save();
                        }
                    })
                    .catch(next);
                break;
        }
    });

    return router;
};