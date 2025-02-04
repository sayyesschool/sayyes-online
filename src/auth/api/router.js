import { Router } from 'express';

import local from './local';
// import oauth from './oauth';

export default context => {
    const router = Router();

    router.use(local(context));
    // app.use(oauth(context));

    return router;
};