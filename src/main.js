import api from './api';
import auth from './auth';
import classroom from './class';
import club from './club';
import cms from './cms';
import context from './context';
import crm from './crm';
import db from './db';
import lk from './lk';
import lms from './lms';
import pay from './pay';
import server from './server';

const { authenticate, authorize, redirect } = context.middleware;

server(context, db(context))
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