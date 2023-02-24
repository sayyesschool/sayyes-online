const { Router } = require('express');
const Middleware = require('./middleware');
const Controller = require('./controller');

module.exports = context => {
    const router = Router();
    const middleware = Middleware(context.models);
    const controller = Controller(context.services);

    router.use(middleware.user);

    router.post('/register', controller.register);
    router.post('/login', controller.login);
    router.get('/logout', controller.logout);

    router.post('/oauth', controller.authenticate);
    router.get('/oauth/:provider/callback', controller.callback, controller.redirect);
    router.get('/oauth/:provider/connect', controller.connect);

    router.post('/reset', controller.sendResetPasswordToken);
    router.get('/reset/:token', controller.showResetPasswordForm);
    router.post('/reset/:token', controller.resetPassword);

    return router;
};