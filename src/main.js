import api from './api';
import auth from './auth';
import classroom from './class';
import club from './club';
import cms from './cms';
import context from './context';
import crm from './crm';
import lk from './lk';
import lms from './lms';
import pay from './pay';
import server from './server';
import webhooks from './webhooks';

const { authenticate, authorize } = context.middleware;

server(context)
    .add('webhooks', webhooks)
    .use(authenticate)
    .add('api', api)
    .add('auth', auth)
    .add('club', club)
    .add('pay', pay)
    .use(authorize)
    .add('class', classroom)
    .add('cms', cms)
    .add('crm', crm)
    .add('lk', lk)
    .add('lms', lms)
    .start();