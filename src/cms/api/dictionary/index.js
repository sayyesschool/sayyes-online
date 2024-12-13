import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/')
        .get(controller.get);

    router.route('/global/:lexemeId?')
        .post(controller.addLexeme);

    router.put('/status/:lexemeId', controller.updatePublishStatus);

    return router;
};