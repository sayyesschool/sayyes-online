import supertest from 'supertest';

import lms from '@/lms/api';

import context from '../context';
import server from '../server';

server.use(lms(context));

export default supertest(server);