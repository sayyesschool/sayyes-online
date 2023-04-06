const express = require('express');

const api = require('./api');

module.exports = context => {
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', __dirname);

    app.locals.basedir = context.config.APP_PATH;

    app.on('mount', parent => {
        Object.assign(app.locals, parent.locals);
    });

    app.use((req, res, next) => {
        req.user?.role === 'teacher' ? next() : next('router');
    });
    app.use('/api', api(context));
    app.use((req, res) => res.render('index'));

    return app;
};