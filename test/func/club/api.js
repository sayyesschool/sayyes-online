import supertest from 'supertest';

import club from '@/club/api';

import context from '../context';
import server from '../server';

server.use(club(context));

export default supertest(server);