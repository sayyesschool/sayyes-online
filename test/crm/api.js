import supertest from 'supertest';

import crm from 'crm/api';

import { context, server, user } from 'test/_env';

server.use(user);
server.use(crm(context));

export default supertest(server);