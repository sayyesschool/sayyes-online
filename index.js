const config = require('./config');
const shared = require('./shared');
const db = require('./db');
const core = require('./core')(config, shared);
const server = require('./server')(config, db);
const api = require('./api');
const auth = require('./auth');
const admin = require('./admin');
const classroom = require('./class');
const client = require('./client');
const main = require('./main');
const teacher = require('./teacher');

const context = {
    config,
    ...core,
    middleware: server.middleware
};

server.use(auth(context));
server.use('/api', api(context));
server.use('/admin', admin(context));
server.use('/class', classroom(context));
server.use('/teacher', teacher(context));
server.use(client(context));
server.use(main(context));

db.connect(config.MONGODB_URI);
server.listen(config.APP_PORT, () => console.log('Server started'));