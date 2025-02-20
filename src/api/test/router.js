import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const { get, process } = Controller(context);

    router.get('/', get);
    router.post('/', process);

    return router;
};