import { Router } from 'express';

import assignments from './assignments';
import courses from './courses';
import enrollments from './enrollments';
import progress from './progress';

export default context => {
    const router = Router();

    router.use('/assignments', assignments(context));
    router.use('/courses', courses(context));
    router.use('/enrollments', enrollments(context));
    router.use('/progress', progress(context));
    router.use('/user*', (req, res) => res.redirect(req.originalUrl.replace('class', req.user.role)));

    router.use((error, req, res, next) => {
        res.status(error.code || error.status || 500).send({
            ok: false,
            error: typeof error === 'object' ? error.message : undefined
        });
    });

    return router;
};