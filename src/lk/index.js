import { resolve } from 'node:path';

import express from 'express';
import vhost from 'vhost';

import api from './api';

export default context => {
    const app = express();

    app.set('trust proxy', true);
    app.set('view engine', 'pug');
    app.set('views', resolve(context.config.APP_PATH, 'lk'));

    app.locals.basedir = context.config.APP_PATH;

    app.on('mount', parent => {
        Object.assign(app.locals, parent.locals);
    });

    app.use('/api', api(context));
    app.use((req, res) => res.render('index'));

    return vhost(`lk.${context.config.APP_DOMAIN}`, app);
};