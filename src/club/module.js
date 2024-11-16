import { resolve } from 'node:path';

import express from 'express';
import vhost from 'vhost';

import api from './api';
import pages from './pages';

export default context => {
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', resolve(context.config.APP_PATH, 'club'));

    Object.assign(app.locals, context.config, {
        basedir: context.config.APP_PATH
    });

    app.use('/api', api(context));
    app.use((req, res, next) =>
        req.user ? res.render('app') : next()
    );
    app.use(pages(context));

    return vhost(`club.${context.config.APP_DOMAIN}`, app);
};