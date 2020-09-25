const router = require('express').Router();

module.exports = twilio => {
    router.get('/tokens/:type', (req, res, next) => {
        const { type } = req.params;
        const { identity, room, device = 'browser' } = req.query;
        let token;

        if (!identity) return next('Identity is not specified');

        if (type === 'video') {
            if (!room) return next('Room is not specified');

            token = twilio.generateVideoToken({ identity, room });
        } else if (type === 'chat') {
            token = twilio.generateChatToken({ identity, device });
        } else if (type === 'sync') {
            token = twilio.generateSyncToken(identity);
        }

        res.json({
            ok: true,
            data: {
                token
            }
        });
    });

    router.post('/rooms', async (req, res) => {

    });

    return router;
};