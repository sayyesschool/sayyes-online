const express = require('express');

const core = require('./core');
const shared = require('./shared');
const api = require('./api');
const auth = require('./auth');
const admin = require('./admin');
const main = require('./main');
const student = require('./student');

const server = express();

server.set('trust proxy', true);
server.set('view engine', 'pug');
server.set('views', __dirname);

server.locals.ENV = server.get('env');
server.locals.VERSION = core.config.APP_VERSION;
server.locals.YANDEX_METRIKA_ID = core.config.YANDEX_METRIKA_ID;
server.locals.GOOGLE_ANALYTICS_ID = core.config.GOOGLE_ANALYTICS_ID;
server.locals.FACEBOOK_PIXEL_ID = core.config.FACEBOOK_PIXEL_ID;
server.locals.basedir = core.config.APP_PATH;

server.use(express.static('public'));
server.use('/lib', express.static('node_modules'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(core.middleware.logger);
server.use(core.middleware.session);
server.use(core.middleware.user);
server.use(...core.middleware.flash);

server.use('/api', api(core));
server.use(shared.routes.common);
server.use(shared.routes.legal);
server.use(auth(core));
server.use('/admin', admin);
server.use((req, res, next) => {
    if (!req.user) return next('route');
    if (req.user.role === 'admin') return res.redirect('/admin');
    if (req.user.role === 'teacher') return res.redirect('/teacher');
    next();
}, student(core));
server.use(main(core));
server.use(shared.routes.errors);

server.listen(core.config.APP_PORT, () => console.log('Server started'));

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');

    server.close(() => {
        console.log('Http server closed.');
        process.exit(0);
    });
});