import { resolve } from 'node:path';

import express from 'express';
import vhost from 'vhost';

import api from './api';
import pages from './pages';

export default (domain, context) => {
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', resolve(context.config.APP_PATH, domain));

    Object.assign(app.locals, context.config, {
        PAY_APP_URL: `https://${domain}.${context.config.APP_DOMAIN}`,
        CONTACT_EMAIL: `info@${context.config.APP_DOMAIN}`,
        basedir: context.config.APP_PATH,
        titleBase: 'Оплата Say Yes'
    });

    app.use('/api', api(context));
    app.use(pages(context));

    return vhost(`${domain}.${context.config.APP_DOMAIN}`, app);
};