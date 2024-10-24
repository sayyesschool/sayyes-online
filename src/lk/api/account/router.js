import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.put('/profile', controller.updateProfile);
    router.put('/avatar', controller.updateAvatar);
    router.put('/password', controller.updatePassword);

    return router;
};