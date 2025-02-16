import supertest from 'supertest';

import pay from 'pay/api';

import { context, server, user } from 'test/_env';

server.use(user);
server.use(pay(context));

export default supertest(server);