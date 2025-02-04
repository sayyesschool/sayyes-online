import { resolve } from 'node:path';

import express from 'express';
import vhost from 'vhost';

import api from './api';
import Middleware from './middleware';

export default (domain, context) => {
    const app = express();
    const middleware = Middleware(context);

    app.set('trust proxy', true);
    app.set('view engine', 'pug');
    app.set('views', resolve(context.config.APP_PATH, `${domain}/views`));

    Object.assign(app.locals, context.config, {
        basedir: context.config.APP_PATH
    });

    app.use(api(context));
    app.use(middleware.redirect);

    return vhost(`${domain}.${context.config.APP_DOMAIN}`, app);
};