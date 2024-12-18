import express from 'express';
import vhost from 'vhost';

import request from './request';
import storage from './storage';
import twilio from './twilio';
import yookassa from './yookassa';
import zoom from './zoom';

export default context => {
    const api = express();

    api.use('/request', request(context));
    api.use('/storage', context.middleware.auth.authenticatedRoute, storage(context));
    api.use('/twilio', twilio(context));
    api.use('/yookassa', yookassa(context));
    api.use('/zoom', zoom(context));

    api.use((error, req, res, next) => {
        console.log(error);

        res.status(500).send({ error: error.message || error });
    });

    return vhost(`api.${context.config.APP_DOMAIN}`, api);
};