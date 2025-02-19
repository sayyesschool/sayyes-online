import supertest from 'supertest';

import pay from 'pay/api';

import { context, Server, user } from 'test/_env';

const server = Server(user, pay(context));

export default supertest(server);