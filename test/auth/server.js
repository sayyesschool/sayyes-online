import supertest from 'supertest';

import auth from 'auth';

import { App, context, Server } from 'test/_env';

const server = Server(App('auth', context, auth));

export default supertest(server);