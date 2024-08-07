import { Router } from 'express';

import account from './account';

export default context => {
    const router = Router();

    router.use('/account', account(context));

    router.use((error, req, res, next) => {
        console.error(error);
        res.status(error.code || error.status || 500).send({
            ok: false,
            error: typeof error === 'object' ? error.message : error
        });
    });

    return router;
};