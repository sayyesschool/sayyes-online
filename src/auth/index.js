const express = require('express');
const path = require('path');
const vhost = require('vhost');

const Middleware = require('./middleware');
const Controller = require('./controller');

module.exports = context => {
    const app = express();
    const middleware = Middleware(context);
    const controller = Controller(context);

    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, 'views'));

    app.locals.basedir = context.config.APP_PATH;
    
    app.get('/', (req, res, next) => {
        req.user ?
            next() :
            res.render('login');
    });
    
    app.post('/register', controller.register, middleware.redirect);
    app.post('/login', controller.login, middleware.redirect);
    app.get('/logout', controller.logout, middleware.redirect);
    app.get('/user', controller.user);
    
    app.post('/oauth', controller.authenticate);
    app.get('/oauth/:provider/callback', controller.callback, controller.redirect);
    app.get('/oauth/:provider/connect', controller.connect);
    
    app.post('/reset', controller.sendResetPasswordToken);
    app.get('/reset/:token', controller.showResetPasswordForm);
    app.post('/reset/:token', controller.resetPassword);

    app.middleware = middleware;

    return vhost(`auth.${context.config.APP_DOMAIN}`, app);
};