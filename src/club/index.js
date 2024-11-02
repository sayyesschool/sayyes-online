import { resolve } from 'node:path';

import express from 'express';
import vhost from 'vhost';

import api from './api';
import pages from './pages';

export default context => {
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', resolve(context.config.APP_PATH, 'club'));

    app.locals.basedir = context.config.APP_PATH;

    app.on('mount', parent => {
        Object.assign(app.locals, parent.locals);
    });

    app.use(pages(context));
    app.use('/api', api(context));
    app.use(
        context.middleware.auth.authorize,
        (req, res) => res.render('app')
    );

    return vhost(`club.${context.config.APP_DOMAIN}`, app);
};