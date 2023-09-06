const config = require('./config');
const db = require('./db');
const core = require('./core');
const api = require('./api');
const auth = require('./auth');
const authMiddleware = require('./auth/middleware');
const cms = require('./cms');
const crm = require('./crm');
const classroom = require('./class');
const lms = require('./lms');
const server = require('./server');

const context = core(config);

context.middleware = {
    auth: authMiddleware(context)
};

db.connect(config.MONGODB_URI);

server(config, db)
    .use('/api', api(context))
    .use(context.middleware.auth.authenticate)
    .use('/auth', auth(context))
    .use('/cms', cms(context))
    .use('/class', classroom(context))
    .use('/crm', crm(context))
    .use('/lms', lms(context))
    .use(context.middleware.auth.redirect)
    .listen(config.APP_PORT, () => {
        console.log('Server started');
    });