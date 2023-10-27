const sinon = require('sinon');

const config = require('./config');
const db = require('./db');
const core = require('./core');
const authMiddleware = require('./auth/middleware');

const context = core(config);

context.db = db;
context.middleware = {
    auth: authMiddleware(context)
};

global.$context = context;

sinon.addBehavior('returnsQuery', (fake, value) => {
    fake.returns({
        populate: sinon.stub().returnsThis(),
        then: fn => fn(value)
    });
});