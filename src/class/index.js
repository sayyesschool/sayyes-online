const express = require('express');
const jwt = require('jsonwebtoken');

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
        (req, res) => res.render('index', {
            ENROLLMENT_ID: req.params.id,
            MIRO_CLIENT_ID: context.config.MIRO_CLIENT_ID,
            MIRO_TOKEN: jwt.sign({
                iss: context.config.MIRO_CLIENT_ID,
                exp: Math.floor(Date.now() / 1000) + 60
            }, context.config.MIRO_CLIENT_SECRET)
        })
    );

    return app;
};