import supertest from 'supertest';

import context from '../context';
import server from '../server';

export default (path, mod) => supertest(server.use(path, mod(context)));