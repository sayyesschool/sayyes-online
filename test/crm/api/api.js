import supertest from 'supertest';

import crm from 'crm/api';

import { context, Server, user } from 'test/_env';

const server = Server(user, crm(context));

export default supertest(server);