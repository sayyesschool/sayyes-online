import { Router } from 'express';

import account from './account';
import enrollments from './enrollments';
import lessons from './lessons';
import meetings from './meetings';
import packs from './packs';
import payments from './payments';
import posts from './posts';
import user from './user';

export default context => {
    const router = Router();

    router.use('/courses*', redirectToCMS);
    router.use('/materials*', redirectToCMS);

    router.use('/account', account(context));
    router.use('/enrollments', enrollments(context));
    router.use('/lessons', lessons(context));
    router.use('/meetings', meetings(context));
    router.use('/packs', packs(context));
    router.use('/payments', payments(context));
    router.use('/posts', posts(context));
    router.use('/user', user(context));

    router.use((error, req, res, next) => {
        console.error(error);
        res.status(error.code || error.status || 500).send({
            ok: false,
            error: typeof error === 'object' ? error.message : error
        });
    });

    return router;
};

function redirectToCMS(req, res) {
    res.redirect(req.originalUrl.replace('learner', 'cms'));
}