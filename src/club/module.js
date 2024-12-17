import { resolve } from 'node:path';

import express from 'express';
import vhost from 'vhost';

import api from './api';
import pages from './pages';

const DOMAIN = 'club';

export default context => {
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', resolve(context.config.APP_PATH, DOMAIN));

    Object.assign(app.locals, context.config, {
        CLUB_URL: `https://club.${context.config.APP_DOMAIN}`,
        CLUB_EMAIL: `club@${context.config.APP_DOMAIN}`,
        basedir: context.config.APP_PATH
    });

    app.use('/api', api(context));
    app.use((req, res, next) =>
        req.user ? res.render('app') : next()
    );
    app.use(pages(context));

    return vhost(`${DOMAIN}.${context.config.APP_DOMAIN}`, app);
};