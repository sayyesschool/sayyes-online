import express, { json } from 'express';
import supertest from 'supertest';

import lms from '@/lms/api';

import assignments from './assignments';
import lessons from './lessons';
import vocabularies from './vocabulary';

const {
    models: {
        User
    }
} = global.$context;

const app = express();
const api = supertest(app);
const user = new User({ firstname: 'User' });

global.$context.user = user;

app.use(json());
app.use((req, res, next) => {
    req.user = user;
    global.$context.user = user;
    next();
});
app.use(lms(global.$context));

describe('LMS API', () => {
    // assignments(api, global.$context);
    // lessons(api, global.$context);
    vocabularies(api, global.$context);
});