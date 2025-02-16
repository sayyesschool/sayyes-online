import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const { payments } = Controller(context);

    router.post('/payments', payments);

    return router;
};