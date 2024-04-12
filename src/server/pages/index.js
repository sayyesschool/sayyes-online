import { Router } from 'express';

import error from './error';
import notFound from './not-found';

export default () => {
    const router = Router();

    router.use(notFound);
    router.use(error);

    return router;
};