import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/')
        .get(controller.get)
        .post(controller.addLexeme)
        .put(controller.mergeLexemes);

    router.get('/search', controller.search);

    router.get('/lexemes', controller.getLexemes);

    router.route('/:lexemeId')
        .put(controller.updateLexeme)
        .delete(controller.deleteLexeme);

    router.route('/status/:lexemeId')
        .put(controller.updatePublishStatus);

    return router;
};