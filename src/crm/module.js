import { resolve } from 'node:path';

import express from 'express';
import vhost from 'vhost';

import api from './api';

export default (domain, context) => {
    const app = express();

    app.set('trust proxy', true);
    app.set('view engine', 'pug');
    app.set('views', resolve(context.config.APP_PATH, domain));

    app.locals.basedir = context.config.APP_PATH;
    app.locals.titleBase = 'CRM | Say Yes';

    app.on('mount', parent => {
        Object.assign(app.locals, parent.locals);
    });

    app.use(context.middleware.authorizeDomain(domain));
    app.use('/api', api(context));
    app.use((req, res) => res.render('app'));

    return vhost(`${domain}.${context.config.APP_DOMAIN}`, app);
};