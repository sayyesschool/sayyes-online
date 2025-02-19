import supertest from 'supertest';

import api from 'api';

import { App, context, Server } from 'test/_env';

const app = App('api', context);
const server = Server(api(app, context));

export default supertest(server);