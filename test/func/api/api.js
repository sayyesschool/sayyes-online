import supertest from 'supertest';

import context from '../context';
import server from '../server';

export default mod => supertest(server.use(mod(context)));