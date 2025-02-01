import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.post('/register', controller.register);

    router.get('/login', controller.showLoginForm);
    router.post('/login', controller.login);

    router.get('/logout', controller.logout);

    router.post('/reset', controller.sendResetPasswordToken);
    router.get('/reset/:token', controller.showResetPasswordForm);
    router.post('/reset/:token', controller.resetPassword);

    router.get('/user', controller.user);

    return router;
};