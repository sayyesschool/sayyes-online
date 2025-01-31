import crypto from 'node:crypto';

import { Router } from 'express';

export default ({
    config: { ZOOM_WEBHOOK_SECRET_TOKEN },
    models: { Meeting, Registration }
}) => {
    const router = Router();

    router.post('/events', async (req, res) => {
        const event = req.body.event;

        if (event === 'endpoint.url_validation') {
            const plainToken = req.body.payload.plainToken;
            const encryptedToken = crypto.createHmac('sha256', ZOOM_WEBHOOK_SECRET_TOKEN).update(plainToken).digest('hex');

            return res.status(200).send({
                plainToken,
                encryptedToken
            });
        }

        const data = req.body.payload?.object;

        try {
            switch (event) {
                case 'meeting.started':
                    await Meeting.updateOne({
                        zoomId: data.id
                    }, {
                        status: Meeting.Status.Started
                    });
                    break;

                case 'meeting.ended':
                    await Meeting.updateOne({
                        zoomId: data.id
                    }, {
                        status: Meeting.Status.Ended
                    });
                    break;

                case 'meeting.participant_joined':
                    await Registration.updateOne({
                        zoomId: data.participant.registrant_id
                    }, {
                        status: Registration.Status.Attended
                    });
                    break;
            }

            res.status(200).send();
        } catch (error) {
            console.log('ZOOM webhook error', error);
            res.status(500).send();
        }
    });

    return router;
};