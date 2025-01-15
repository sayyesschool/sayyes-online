import cors from 'cors';
import express from 'express';
import vhost from 'vhost';

import recaptcha from './recaptcha';
import request from './request';
import storage from './storage';
import test from './test';
import twilio from './twilio';
import yookassa from './yookassa';
import zoom from './zoom';

export default (domain, context) => {
    const api = express();

    api.use(cors({
        origin: /sayyes\.(school|dev|local)$/,
        credentials: true
    }));

    api.use('/recaptcha', recaptcha(context));
    api.use('/request', request(context));
    api.use('/storage', context.middleware.auth.authenticatedRoute, storage(context));
    api.use('/test', test(context));
    api.use('/twilio', twilio(context));
    api.use('/yookassa', yookassa(context));
    api.use('/zoom', zoom(context));

    api.use((error, req, res, next) => {
        if (error instanceof Error) {
            console.error(error);
        }

        res.status(error.status || 500).send({
            ok: false,
            error: typeof error === 'object' ? error.message : error
        });
    });

    return vhost(`${domain}.${context.config.APP_DOMAIN}`, api);
};