const express = require('express');
const supertest = require('supertest');

const lms = require('../../../src/lms/api');
const assignments = require('./assignments');
const lessons = require('./lessons');

const {
    models: {
        User
    }
} = global.$context;

const app = express();
const api = supertest(app);
const user = new User({ firstname: 'User' });

app.use(express.json());
app.use((req, res, next) => {
    req.user = user;
    next();
});
app.use(lms(global.$context));

describe('LMS API', () => {
    assignments(api, global.$context);
    lessons(api, global.$context);
});