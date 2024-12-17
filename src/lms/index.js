import { resolve } from 'node:path';

import express from 'express';
import vhost from 'vhost';

import api from './api';

const DOMAIN = 'lms';

export default context => {
    const app = express();

    app.set('trust proxy', true);
    app.set('view engine', 'pug');
    app.set('views', resolve(context.config.APP_PATH, DOMAIN));

    app.locals.basedir = context.config.APP_PATH;

    app.on('mount', parent => {
        Object.assign(app.locals, parent.locals);
    });

    app.use((req, res, next) => {
        req.user?.hasDomain(DOMAIN) ? next() : next('router');
    });
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

    return vhost(`${DOMAIN}.${context.config.APP_DOMAIN}`, app);
};