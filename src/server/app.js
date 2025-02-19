import { resolve } from 'node:path';

import express from 'express';

export default (name, context) => {
    const app = express();

    app.set('name', name);
    app.set('trust proxy', true);
    app.set('view engine', 'pug');
    app.set('views', resolve(context.config.APP_PATH, name));

    Object.assign(app.locals, context.config, {
        basedir: context.config.APP_PATH,
        YEAR: new Date().getFullYear()
    });

    app.use((error, req, res, next) => {
        if (error instanceof Error) {
            console.error(error);
        }

        if (req.is('json')) {
            res.status(error.code ?? error.status ?? 500).send({
                ok: false,
                error: typeof error === 'object' ? error.message : error
            });
        } else {
            res.render('error', {
                error
            });
        }
    });

    return app;
};