import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const { events } = Controller(context);

    router.post('/events', events);

    return router;
};