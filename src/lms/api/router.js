import { Router } from 'express';

import assignments from './assignments';
import comments from './comments';
import courses from './courses';
import enrollments from './enrollments';
import exercises from './exercises';
import lessons from './lessons';
import materials from './materials';
import progress from './progress';
import vocabularies from './vocabularies';

export default context => {
    const router = Router();

    router.use('/assignments', assignments(context));
    router.use('/comments', comments(context));
    router.use('/courses', courses(context));
    router.use('/enrollments', enrollments(context));
    router.use('/exercises', exercises(context));
    router.use('/lessons', lessons(context));
    router.use('/materials', materials(context));
    router.use('/progress', progress(context));
    router.use('/vocabularies', vocabularies(context));

    router.use((error, req, res, next) => {
        if (error instanceof Error) {
            console.error(error);
        }

        res.status(error.code || error.status || 500).send({
            ok: false,
            error: typeof error === 'object' ? error.message : error
        });
    });

    return router;
};