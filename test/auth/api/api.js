import { resolve } from 'node:path';

import supertest from 'supertest';

import auth from 'auth/api';

import { context, server } from 'test/_env';

server.set('views', resolve(context.config.APP_PATH, 'auth/views'));

server.use(auth(context));

export default supertest(server);