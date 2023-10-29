const express = require('express');
const path = require('path');

const api = require('./api');
const Middleware = require('./middleware');
const Controller = require('./controller');

module.exports = context => {
    const app = express();
    const middleware = Middleware(context);
    const controller = Controller(context);

    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, 'views'));

    app.locals.basedir = context.config.APP_PATH;

    app.use('/api', api(context));

    app.get('/', (req, res) => {
        res.render('login');
    });

    app.post('/register', controller.register);
    app.post('/login', controller.login);
    app.get('/logout', controller.logout);

    app.post('/oauth', controller.authenticate);
    app.get('/oauth/:provider/callback', controller.callback, controller.redirect);
    app.get('/oauth/:provider/connect', controller.connect);

    app.post('/reset', controller.sendResetPasswordToken);
    app.get('/reset/:token', controller.showResetPasswordForm);
    app.post('/reset/:token', controller.resetPassword);

    app.middleware = middleware;

    return app;
};