const express = require('express');

const api = require('./api');

const ALLOWED_ROLES = ['learner', 'teacher'];

module.exports = context => {
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', __dirname);

    app.locals.basedir = context.config.APP_PATH;

    app.on('mount', parent => {
        Object.assign(app.locals, parent.locals);
    });

    // app.use((req, res, next) => {
    //     ALLOWED_ROLES.includes(req.user?.role) ? next() : next('router');
    // });
    app.use('/api', api(context));
    app.use((req, res, next) => {
        const twilio = context.libs.twilio;
        const options = {
            identity: req.user.id,
            friendlyName: req.user.fullname,
            room: req.params.id
        };

        res.locals.TWILIO_CHAT_TOKEN = twilio.generateChatToken(options);

        next();
    }, (req, res) => {
        res.render('index');
    });

    return app;
};