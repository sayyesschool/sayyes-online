import { Router } from 'express';

import Controller from './controller';
// import Middleware from './middleware';

export default context => {
    const router = Router();
    const controller = Controller(context);
    // const middleware = Middleware(context);

    router.route('/')
        .get(controller.getMany)
        .post(controller.create);

    router.route('/:id')
        .get(controller.getOne);

    router.route('/:vocabularyId/:lexemeId?')
        .post(controller.addLexeme)
        .put(controller.updateLexeme)
        .delete(controller.removeLexeme);

    return router;
};