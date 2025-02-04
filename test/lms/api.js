import supertest from 'supertest';

import lms from 'lms/api';

import { context, server, user } from 'test/_env';

server.use(user);
server.use(lms(context));

export default supertest(server);