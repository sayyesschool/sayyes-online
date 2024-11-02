import { Router } from 'express';

import meetings from './meetings';

export default context => {
    const router = Router();

    router.use('/meetings', meetings(context));

    router.use((error, req, res, next) => {
        console.error(error);
        res.status(error.status || 500).send({
            ok: false,
            error: typeof error === 'object' ? error.message : error
        });
    });

    return router;
};