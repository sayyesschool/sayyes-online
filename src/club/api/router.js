import { Router } from 'express';

import meetings from './meetings';
import memberships from './memberships';

export default context => {
    const router = Router();

    router.use('/meetings', meetings(context));
    router.use('/memberships', memberships(context));

    router.use((error, req, res, next) => {
        if (error instanceof Error) {
            console.error(error);
        }

        res.status(error.code ?? error.status ?? 500).send({
            ok: false,
            error: typeof error === 'object' ? error.message : error
        });
    });

    return router;
};