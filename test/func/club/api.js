import express, { json } from 'express';
import supertest from 'supertest';

import club from '@/club/api';

import { user, userMiddleware } from '../helpers.js';

const server = express()
    .use(json())
    .use(userMiddleware)
    .use(club(global.$context));

export { user };

export default supertest(server);