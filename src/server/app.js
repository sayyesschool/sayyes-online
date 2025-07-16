import { resolve } from 'node:path';

import express from 'express';

export default (name, context, setup) => {
    const app = express();

    app.set('name', name);
    app.set('trust proxy', true);
    app.set('view engine', 'pug');
    app.set('views', resolve(context.config.APP_PATH, name));

    Object.assign(app.locals, context.config, {
        basedir: context.config.APP_PATH,
        YEAR: new Date().getFullYear()
    });

    setup(app, context);

    app.use((error, req, res, next) => {
        if (error instanceof Error) {
            console.error(error);
        }

        if (req.host.startsWith('api') || req.is('json')) {
            const code = error.code ?? error.status;

            res.status(isNaN(code) ? 500 : code).send({
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