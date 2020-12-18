const express = require('express');

const middleware = require('./middleware');
const errorPage = require('./pages/error');
const notFoundPage = require('./pages/not-found');

module.exports = (config, db) => {
    const server = express();

    server.set('trust proxy', true);
    server.set('view engine', 'pug');
    server.set('views', __dirname);

    server.locals.ENV = server.get('env');
    server.locals.VERSION = config.APP_VERSION;
    server.locals.YANDEX_METRIKA_ID = config.YANDEX_METRIKA_ID;
    server.locals.GOOGLE_ANALYTICS_ID = config.GOOGLE_ANALYTICS_ID;
    server.locals.FACEBOOK_PIXEL_ID = config.FACEBOOK_PIXEL_ID;
    server.locals.basedir = config.APP_PATH;

    server.use(express.static('public'));
    server.use('/lib', express.static('node_modules'));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(middleware.logger);
    server.use(middleware.session(config, db.connection));
    server.use(...middleware.flash);

    server.on('mount', () => {
        server.use(errorPage);
        server.use(notFoundPage);
    });

    process.on('SIGTERM', () => {
        console.info('SIGTERM signal received.');
        console.log('Closing http server.');

        server.close(() => {
            console.log('Http server closed.');
            process.exit(0);
        });
    });

    server.middleware = middleware;

    return server;
};