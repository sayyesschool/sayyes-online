import supertest from 'supertest';

import club from 'club/api';

import { context, Server, user } from 'test/_env';

const server = Server(user, club(context));

export default supertest(server);