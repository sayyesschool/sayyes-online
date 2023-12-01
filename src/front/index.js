const express = require('express');

const router = require('./router');

module.exports = context => {
    const app = express();

    app.set('view engine', 'twig');
    app.set('views', __dirname);
    app.set('twig options', {
        allowAsync: true,
        strict_variables: false
    });

    app.locals.basedir = context.config.APP_PATH;
    app.locals.APP_DOMAIN = context.config.APP_DOMAIN;

    app.on('mount', parent => {
        Object.assign(app.locals, parent.locals);
    });

    app.use((req, res, next) => {
        if (req.session.userId || req.subdomains.length > 0)
            return next('router');

        next();
    });

    app.use(router);

    return app;
};