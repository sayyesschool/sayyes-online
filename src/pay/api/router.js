import { Router } from 'express';

import payments from './payments';

export default context => {
    const router = Router();

    router.use('/payments', payments(context));

    router.use((error, req, res, next) => {
        if (error instanceof Error) {
            console.error(error);
        }

        res.status(error.status || 500).send({
            ok: false,
            error: typeof error === 'object' ? error.message : error
        });
    });

    return router;
};