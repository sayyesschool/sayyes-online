import supertest from 'supertest';

import auth from 'auth';

import { App, context, server } from 'test/_env';

const app = App('auth', context);

server.use(auth(app, context));

export default supertest(server);