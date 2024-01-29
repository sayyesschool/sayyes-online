const fs = require('fs');

const config = require('./config');
const db = require('./db');
const core = require('./core');
const api = require('./api');
const auth = require('./auth');
const authMiddleware = require('./auth/middleware');
const classroom = require('./class');
const cms = require('./cms');
const crm = require('./crm');
const lms = require('./lms');
const server = require('./server');

const context = core(config);

context.db = db;
context.middleware = {
    auth: authMiddleware(context)
};

const options = config.APP_ENV === 'production' ? null : {
    key: fs.readFileSync('/etc/ssl/private/sayyes-selfsigned.key'),
    cert: fs.readFileSync('/etc/ssl/certs/sayyes-selfsigned.crt')
};

const { authenticate, authorize, redirect } = context.middleware.auth;

server(context, options)
    .use(authenticate)
    .use(api(context))
    .use(auth(context))
    .use(authorize, classroom(context))
    .use(authorize, cms(context))
    .use(authorize, crm(context))
    .use(authorize, lms(context))
    .use(redirect)
    .listen(config.APP_PORT, () => {
        console.log('Server started');
    });