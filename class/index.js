const express = require('express');

const api = require('./api');
const auth = require('./auth');

module.exports = context => {
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', __dirname);

    app.on('mount', parent => {
        Object.assign(app.locals, parent.locals);
    });

    app.use(auth);
    app.use('/api', api(context));
    app.use('/:id?',
        context.middleware.tokens(context.libs.twilio),
        (req, res) => res.render('index', { ENROLLMENT_ID: req.params.id })
    );

    return app;
};