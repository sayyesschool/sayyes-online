import supertest from 'supertest';

import club from 'club/api';

import { context, server, user } from 'test/_env';

server.use(user);
server.use(club(context));

export default supertest(server);