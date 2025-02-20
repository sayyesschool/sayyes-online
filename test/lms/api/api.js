import supertest from 'supertest';

import lms from 'lms/api';

import { context, Server, user } from 'test/_env';

const server = Server(user, lms(context));

export default supertest(server);