const config = require('./config');
const db = require('./db');
const core = require('./core');
const api = require('./api');
const auth = require('./auth');
const authMiddleware = require('./auth/middleware');
const cms = require('./cms');
const crm = require('./crm');
const classroom = require('./class');
const learner = require('./learner');
const server = require('./server');
const teacher = require('./teacher');

const context = core(config);

context.middleware = {
    auth: authMiddleware(context)
};

db.connect(config.MONGODB_URI);

server(config, db)
    .use(auth(context))
    .use('/api', api(context))
    .use('/cms', cms(context))
    .use('/class', classroom(context))
    .use('/crm', crm(context))
    .use('/client', learner(context))
    .use('/teacher', teacher(context))
    .listen(config.APP_PORT, () => {
        console.log('Server started');
    });