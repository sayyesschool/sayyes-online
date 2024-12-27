import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/')
        .get(controller.get)
        .post(controller.addLexeme);

    router.route('/:lexemeId')
        .delete(controller.deleteLexeme);

    router.route('/status/:lexemeId')
        .put(controller.updatePublishStatus);

    return router;
};