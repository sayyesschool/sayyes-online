import { resolve } from 'node:path';

import express from 'express';
import vhost from 'vhost';

import api from './api';
import data from './data';
import pages from './pages';

export default (name, context) => {
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', resolve(context.config.APP_PATH, name));

    Object.assign(app.locals, context.config, {
        PAY_APP_URL: `https://${name}.${context.config.APP_DOMAIN}`,
        CONTACT_EMAIL: `info@${context.config.APP_DOMAIN}`,
        basedir: context.config.APP_PATH,
        titleBase: 'Оплата Say Yes'
    });

    app.use('/api', api(context));
    app.use(pages(context, data));

    return vhost(`${name}.${context.config.APP_DOMAIN}`, app);
};