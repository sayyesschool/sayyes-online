import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/')
        .get(controller.get)
        .post(controller.createLexeme)
        .put(controller.mergeLexemes);

    router.get('/search', controller.search);

    router.put('/merge', controller.mergeLexemes);

    router.route('/:lexemeId')
        .post(controller.approveLexeme)
        .put(controller.updateLexeme)
        .delete(controller.deleteLexeme);

    router.route('/:lexemeId/status')
        .put(controller.updatePublishStatus);

    return router;
};