import supertest from 'supertest';

import lk from 'lk/api';

import { context, server, user } from 'test/_env';

server.use(user);
server.use(lk(context));

export default supertest(server);