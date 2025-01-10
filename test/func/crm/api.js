import supertest from 'supertest';

import crm from '@/crm/api';

import context from '../context';
import server from '../server';

server.use(crm(context));

export default supertest(server);