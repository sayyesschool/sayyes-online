import { Router } from 'express';

import courses from './courses';
import materials from './materials';
import user from './user';
import vocabularies from './vocabularies';

export default context => {
    const router = Router();

    router.use('/courses', courses(context));
    router.use('/materials', materials(context));
    router.use('/user', user(context));
    router.use('/vocabularies', vocabularies(context));

    router.use((error, req, res, next) => {
        console.error(error);

        res.status(error.code || error.status || 500).send({
            ok: false,
            error: error.message || error
        });
    });

    return router;
};