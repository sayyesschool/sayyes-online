import supertest from 'supertest';

import auth from 'auth';

import { App, context, Server } from 'test/_env';

const app = App('auth', context);
const server = Server(auth(app, context));

export default supertest(server);