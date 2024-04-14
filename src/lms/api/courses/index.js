import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.get('/', controller.getCourses);
    router.get('/:course', controller.getCourse);

    return router;
};