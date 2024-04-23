import { Router } from 'express';

import Controller from './controller';
import Middleware from './middleware';

export default context => {
    const router = Router();
    const controller = Controller(context);
    const middleware = Middleware(context);

    router.param('vocabularyId', middleware.findOne);

    router.route('/')
        .get(controller.getMany)
        .post(controller.create);

    router.route('/:vocabularyId')
        .get(controller.getOne)
        .put(controller.update)
        .delete(controller.delete);

    router.route('/:vocabularyId/lexemes/:lexemeId?')
        .post(controller.addLexeme)
        .put(controller.updateLexeme)
        .delete(controller.removeLexeme);

    return router;
};