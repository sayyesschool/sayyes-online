import jwt from 'jsonwebtoken';

import api from './api';

export default (app, context) => {
    app.use(context.middleware.authorizeDomain('class'));
    app.use('/api', api(context));
    app.use('/:id',
        (req, res, next) => {
            const twilio = context.clients.twilio;
            const options = {
                identity: req.user.id,
                friendlyName: req.user.fullname,
                room: req.params.id
            };

            res.locals.TWILIO_CHAT_TOKEN = twilio.generateChatToken(options);
            res.locals.TWILIO_VIDEO_TOKEN = twilio.generateVideoToken(options);
            res.locals.TWILIO_SYNC_TOKEN = twilio.generateSyncToken(options);

            next();
        },
        (req, res) => res.render('app', {
            ENROLLMENT_ID: req.params.id,
            MIRO_CLIENT_ID: context.config.MIRO_CLIENT_ID,
            MIRO_TOKEN: jwt.sign({
                iss: context.config.MIRO_CLIENT_ID,
                exp: Math.floor(Date.now() / 1000) + 60
            }, context.config.MIRO_CLIENT_SECRET)
        })
    );

    return app;
};