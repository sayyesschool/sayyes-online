const express = require('express');

const api = require('./api');

const ALLOWED_ROLES = ['editor', 'learner', 'manager', 'teacher'];

module.exports = core => {
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', __dirname);

    app.on('mount', parent => {
        Object.assign(app.locals, parent.locals);
    });

    app.use('/api', api(core));
    app.use((req, res, next) => {
        ALLOWED_ROLES.includes(req.user?.role) ? next() : next('router');
    });
    app.use((req, res) => res.render('index'));

    return app;
};