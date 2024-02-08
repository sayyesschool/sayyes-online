const express = require('express');
const jwt = require('jsonwebtoken');
const vhost = require('vhost');

const api = require('./api');

const ALLOWED_ROLES = ['learner', 'teacher'];

module.exports = context => {
    const app = express();

    app.set('trust proxy', true);
    app.set('view engine', 'pug');
    app.set('views', __dirname);

    app.locals.basedir = context.config.APP_PATH;

    app.on('mount', parent => {
        Object.assign(app.locals, parent.locals);
    });

    app.use((req, res, next) => {
        ALLOWED_ROLES.includes(req.user?.role) ? next() : next('router');
    });
    app.use('/api', api(context));
    app.use('/:id?',
        (req, res, next) => {
            const twilio = context.libs.twilio;
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
        (req, res) => res.render('index', {
            ENROLLMENT_ID: req.params.id,
            MIRO_CLIENT_ID: context.config.MIRO_CLIENT_ID,
            MIRO_TOKEN: jwt.sign({
                iss: context.config.MIRO_CLIENT_ID,
                exp: Math.floor(Date.now() / 1000) + 60
            }, context.config.MIRO_CLIENT_SECRET)
        })
    );

    return vhost(`class.${context.config.APP_DOMAIN}`, app);
};