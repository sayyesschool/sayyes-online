const { Router } = require('express');
const Controller = require('./controller');

module.exports = core => {
    const router = Router();
    const controller = Controller(core.services);

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