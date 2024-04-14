import express, { json } from 'express';
import supertest from 'supertest';

import lms from '../../../src/lms/api/router.js';

import assignments from './assignments.js';
import lessons from './lessons.js';

const {
    models: {
        User
    }
} = global.$context;

const app = express();
const api = supertest(app);
const user = new User({ firstname: 'User' });

app.use(json());
app.use((req, res, next) => {
    req.user = user;
    next();
});
app.use(lms(global.$context));

describe('LMS API', () => {
    assignments(api, global.$context);
    lessons(api, global.$context);
});