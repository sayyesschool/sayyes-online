import { Router } from 'express';

import Controller from './controller';
import Middleware from './middleware';

export default context => {
    const router = Router();
    const controller = Controller(context);
    const middleware = Middleware(context);

    router.route('/')
        .get(controller.getMany)
        .create(controller.create);

    router.route('/:id')
        .use(middleware.fineOne)
        .get(controller.get)
        .post(controller.create)
        .put(controller.update)
        .delete(controller.delete);

    router.route('/:vocabularyId/:lexemeId?')
        .use(middleware.fineOne)
        .post(controller.addLexeme)
        .put(controller.updateLexeme)
        .delete(controller.removeLexeme);

    return router;
};