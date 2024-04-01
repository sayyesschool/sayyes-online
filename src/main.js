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
    cert: fs.readFileSync(config.SSL_CERT_PATH),
    key: fs.readFileSync(config.SSL_KEY_PATH)
};

const { authenticate, authorize, redirect } = context.middleware.auth;

db.connect(config.MONGODB_URI);

server(context, options)
    .use(authenticate)
    .use(api(context))
    .use(auth(context))
    .use(authorize, classroom(context))
    .use(authorize, cms(context))
    .use(authorize, crm(context))
    .use(authorize, lms(context))
    .use(redirect)
    .start();