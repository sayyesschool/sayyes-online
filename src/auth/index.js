const express = require('express');
const path = require('path');
const vhost = require('vhost');

const api = require('./api');
const Middleware = require('./middleware');
const Controller = require('./controller');

module.exports = {
    middleware: context => Middleware(context),
    app: context => {
        const app = express();
        const controller = Controller(context);

        app.set('view engine', 'pug');
        app.set('views', path.join(__dirname, 'views'));

        app.locals.basedir = context.config.APP_PATH;

        app.use('/api', api);

        // app.use((req, res, next) => {
        //     if (!req.user) return next();

        //     console.log(req.user);

        //     console.log(`//${req.user.role}.${context.config.APP_DOMAIN}${req.originalUrl}`);

        //     res.redirect(`//${req.user.role}.${context.config.APP_DOMAIN}${req.originalUrl}`);
        // });

        app.get('/', (req, res) => res.render('login', { user: req.user }));

        app.post('/register', controller.register);
        app.post('/login', controller.login);
        app.get('/logout', controller.logout);

        app.post('/oauth', controller.authenticate);
        app.get('/oauth/:provider/callback', controller.callback, controller.redirect);
        app.get('/oauth/:provider/connect', controller.connect);

        app.post('/reset', controller.sendResetPasswordToken);
        app.get('/reset/:token', controller.showResetPasswordForm);
        app.post('/reset/:token', controller.resetPassword);

        return vhost(`auth.${context.config.APP_DOMAIN}`, app);
    }
};