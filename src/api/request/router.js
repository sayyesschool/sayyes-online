import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const { post } = Controller(context);

    router.post('/', post);

    return router;
};