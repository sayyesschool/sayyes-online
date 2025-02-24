import { Router } from 'express';

import Controller from './controller';
import Strategies from './strategies';

export default context => {
    const router = Router();
    const strategies = Strategies(context);
    const controller = Controller(context, strategies);

    router.post('/oauth', controller.authenticate);
    router.get('/oauth/:provider/callback', controller.callback, controller.redirect);
    router.get('/oauth/:provider/connect', controller.connect);

    return router;
};