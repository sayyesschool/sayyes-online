import { Router } from 'express';
import multer from 'multer';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);
    const upload = multer();

    router.put('/profile', upload.single('avatar'), controller.updateProfile);
    router.put('/password', controller.updatePassword);

    return router;
};