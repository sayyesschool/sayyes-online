import express, { json } from 'express';
import supertest from 'supertest';

import lms from '@/lms/api';

import { user, userMiddleware } from '../helpers.js';

const server = express()
    .use(json())
    .use(userMiddleware)
    .use(lms(global.$context));

export { user };

export default supertest(server);