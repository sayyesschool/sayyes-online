import { Router } from 'express';

import Controller from './controller';
import Middleware from './middleware';

export default context => {
    const router = Router();
    const { uploadFile, deleteFile } = Controller(context);
    const { file } = Middleware(context);

    router.post('/', file, uploadFile);
    router.delete('/', deleteFile);

    return router;
};