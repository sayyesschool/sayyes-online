import supertest from 'supertest';

import api from 'api';

import { App, context, server } from 'test/_env';

const app = App('api', context);

server.use(api(app, context));

export default supertest(server);