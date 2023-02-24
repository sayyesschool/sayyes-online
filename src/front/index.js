const path = require('path');
const express = require('express');
const moment = require('moment');

const main = require('./main');

module.exports = context => {
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', [
        context.config.APP_PATH,
        path.join(context.config.APP_PATH, 'front')
    ]);

    app.on('mount', parent => {
        app.locals.moment = moment;
        Object.assign(app.locals, parent.locals);
    });

    app.use((req, res, next) => {
        if (!req.user) return next();

        const role = req.user.role;

        if (role === 'manager') return res.redirect('/admin');
        if (role === 'client') return res.redirect('/client');
        if (role === 'teacher') return res.redirect('/teacher');

        next();
    });

    app.use('/', main(context));

    return app;
};