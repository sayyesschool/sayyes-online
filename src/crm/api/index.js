const { Router } = require('express');

const clients = require('./clients');
const comments = require('./comments');
const courses = require('./courses');
const enrollments = require('./enrollments');
const lessons = require('./lessons');
const managers = require('./managers');
const materials = require('./materials');
const meetings = require('./meetings');
const packs = require('./packs');
const payments = require('./payments');
const requests = require('./requests');
const rooms = require('./rooms');
const teachers = require('./teachers');
const tickets = require('./tickets');
const user = require('./user');
const users = require('./users');

module.exports = context => {
    const router = Router();

    router.use('/clients', clients(context));
    router.use('/comments', comments(context));
    router.use('/courses', courses(context));
    router.use('/enrollments', enrollments(context));
    router.use('/lessons', lessons(context));
    router.use('/managers', managers(context));
    router.use('/materials', materials(context));
    router.use('/meetings', meetings(context));
    router.use('/packs', packs(context));
    router.use('/payments', payments(context));
    router.use('/requests', requests(context));
    router.use('/rooms', rooms(context));
    router.use('/teachers', teachers(context));
    router.use('/tickets', tickets(context));
    router.use('/user', user(context));
    router.use('/users', users(context));

    router.use((error, req, res, next) => {
        console.error(error);
        res.status(error.code || error.status || 500).send({ ok: false, error: error.message || error });
    });

    return router;
};