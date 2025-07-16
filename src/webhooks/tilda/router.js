import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const { submit } = Controller(context);

    router.post('/submit', submit);

    return router;
};