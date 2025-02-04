import supertest from 'supertest';

import { context, server } from 'test/_env';

export default (path, mod) => supertest(server.use(path, mod(context)));