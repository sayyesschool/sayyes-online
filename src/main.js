import { readFileSync } from 'node:fs';

import api from './api';
import auth, { Middleware as AuthMiddleware } from './auth';
import classroom from './class';
import cms from './cms';
import config from './config';
import core from './core';
import crm from './crm';
import db from './db';
import lk from './lk';
import lms from './lms';
import server from './server';

const context = core(config);
const authMiddleware = AuthMiddleware(context);

const { authenticate, authorize, redirect } = authMiddleware;

const options = config.APP_ENV === 'production' ? null : {
    cert: readFileSync(config.SSL_CERT_PATH),
    key: readFileSync(config.SSL_KEY_PATH)
};

context.db = db;
context.middleware = {
    auth: authMiddleware
};

db.connect(config.MONGODB_URI);

server(context, options)
    .use(authenticate)
    .use(api(context))
    .use(auth(context))
    .use(authorize, classroom(context))
    .use(authorize, cms(context))
    .use(authorize, crm(context))
    .use(authorize, lk(context))
    .use(authorize, lms(context))
    .use(redirect)
    .start();