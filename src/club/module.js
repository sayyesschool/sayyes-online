import { resolve } from 'node:path';

import express from 'express';
import vhost from 'vhost';

import api from './api';
import pages, { routes } from './pages';

const MODULE_NAME = 'club';

export default context => {
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', resolve(context.config.APP_PATH, MODULE_NAME));

    Object.assign(app.locals, context.config, {
        CLUB_URL: `https://club.${context.config.APP_DOMAIN}`,
        CLUB_EMAIL: `club@${context.config.APP_DOMAIN}`,
        basedir: context.config.APP_PATH,
        titleBase: 'Разговорный клуб Say Yes'
    });

    app.use('/api', api(context));
    app.use((req, res, next) => {
        if (routes.includes(req.url)) {
            next();
        } else if (req.user) {
            res.render('app');
        } else {
            next();
        }
    });
    app.use(pages(context));

    return vhost(`${MODULE_NAME}.${context.config.APP_DOMAIN}`, app);
};