import supertest from 'supertest';

import lk from 'lk/api';

import { context, Server, user } from 'test/_env';

const server = Server(user, lk(context));

export default supertest(server);