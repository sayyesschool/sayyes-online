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

    router.get('/search', controller.search);

    router.route('/my/lexemes')
        .get(controller.getLexemes)
        .post(controller.addLexemes);

    router.route('/my{/:lexemeId}')
        .get(controller.getVirtual)
        .post(controller.addLexeme)
        .put(controller.updateLexeme)
        .delete(controller.deleteLexeme);

    router.put('/status/:lexemeId', controller.updateLexemeStatus);

    router.route('/:vocabularyId')
        .get(controller.getOne)
        .put(controller.update)
        .delete(controller.delete);

    router.route('/:vocabularyId{/:lexemeId}')
        .post(controller.addLexeme)
        .put(controller.updateLexeme)
        .delete(controller.removeLexeme);

    return router;
};