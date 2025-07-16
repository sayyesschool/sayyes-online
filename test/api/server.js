import supertest from 'supertest';

import api from 'api';

import { App, context, Server } from 'test/_env';

const server = Server(App('api', context, api));

export default supertest(server);