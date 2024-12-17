import { Router } from 'express';

import comments from './comments';
import courses from './courses';
import enrollments from './enrollments';
import learners from './learners';
import lessons from './lessons';
import managers from './managers';
import materials from './materials';
import meetings from './meetings';
import memberships from './memberships';
import packs from './packs';
import payments from './payments';
import requests from './requests';
import rooms from './rooms';
import teachers from './teachers';
import users from './users';

export default context => {
    const router = Router();

    router.use('/comments', comments(context));
    router.use('/courses', courses(context));
    router.use('/enrollments', enrollments(context));
    router.use('/learners', learners(context));
    router.use('/lessons', lessons(context));
    router.use('/managers', managers(context));
    router.use('/materials', materials(context));
    router.use('/meetings', meetings(context));
    router.use('/memberships', memberships(context));
    router.use('/packs', packs(context));
    router.use('/payments', payments(context));
    router.use('/requests', requests(context));
    router.use('/rooms', rooms(context));
    router.use('/teachers', teachers(context));
    router.use('/users', users(context));

    router.use((error, req, res, next) => {
        console.error(error);
        res.status(error.code || error.status || 500).send({ ok: false, error: error.message || error });
    });

    return router;
};