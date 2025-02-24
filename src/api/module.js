import cors from 'cors';

import captcha from './captcha';
import request from './request';
import storage from './storage';
import test from './test';
import twilio from './twilio';

export default (app, context) => {
    app.use(cors({
        origin: /sayyes\.(school|dev|local)$/,
        credentials: true
    }));

    app.use(['/captcha', '/recaptcha'], captcha(context));
    app.use('/request', request(context));
    app.use('/storage', context.middleware.authenticatedRoute, storage(context));
    app.use('/test', test(context));
    app.use('/twilio', twilio(context));

    return app;
};