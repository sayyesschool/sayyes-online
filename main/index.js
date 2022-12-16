const path = require('path');
const express = require('express');
const moment = require('moment');

const front = require('./front');

module.exports = context => {
    const main = express();

    main.set('view engine', 'pug');
    main.set('views', [
        context.config.APP_PATH,
        path.join(context.config.APP_PATH, 'main')
    ]);

    main.on('mount', parent => {
        main.locals.moment = moment;
        Object.assign(main.locals, parent.locals);
    });

    main.use((req, res, next) => {
        if (!req.user) return next();

        const role = req.user.role;

        if (role === 'manager') return res.redirect('/admin');
        if (role === 'client') return res.redirect('/client');
        if (role === 'teacher') return res.redirect('/teacher');

        next();
    });

    main.use('/', front(context));

    return main;
};