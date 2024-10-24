import { Router } from 'express';

import account from './account';

export default context => {
    const router = Router();

    router.use('/account', account(context));

    return router;
};