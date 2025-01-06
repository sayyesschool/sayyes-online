import { readFileSync } from 'node:fs';

import api from './api';
import auth, { Middleware as AuthMiddleware } from './auth';
import classroom from './class';
import club from './club';
import cms from './cms';
import config from './config';
import core from './core';
import crm from './crm';
import db from './db';
import lk from './lk';
import lms from './lms';
import pay from './pay';
import server from './server';

const context = core(config);
const authMiddleware = AuthMiddleware(context);

const options = config.NODE_ENV === 'production' ? null : {
    cert: readFileSync(config.SSL_CERT_PATH),
    key: readFileSync(config.SSL_KEY_PATH)
};

context.db = db;
context.middleware = {
    auth: authMiddleware
};

db.connect(config.MONGODB_URI);

const { authenticate, authorize, redirect } = authMiddleware;

server(context, options)
    .use(authenticate)
    .use(api('api', context))
    .use(auth('auth', context))
    .use(club('club', context))
    .use(pay('pay', context))
    .use(authorize, classroom('class', context))
    .use(authorize, cms('cms', context))
    .use(authorize, crm('crm', context))
    .use(authorize, lk('lk', context))
    .use(authorize, lms('lms', context))
    .use(redirect)
    .start();