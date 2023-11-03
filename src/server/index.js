const cors = require('cors');
const express = require('express');
const https = require('https');

const middleware = require('./middleware');
const pages = require('./pages');

module.exports = (config, db, options) => {
    const server = express();

    server.set('trust proxy', true);
    server.set('view engine', 'pug');
    server.set('views', config.APP_PATH);

    server.locals.ENV = server.get('env');
    server.locals.VERSION = config.APP_VERSION;
    server.locals.YANDEX_METRIKA_ID = config.YANDEX_METRIKA_ID;
    server.locals.GOOGLE_ANALYTICS_ID = config.GOOGLE_ANALYTICS_ID;
    server.locals.FACEBOOK_PIXEL_ID = config.FACEBOOK_PIXEL_ID;
    server.locals.basedir = config.APP_PATH;

    server.use(cors({
        // origin: '*',
        origin: /sayyes\.(ru|local)$/,
        credentials: true
    }));

    server.use(express.static('public'));
    server.use('/lib', express.static('node_modules'));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(middleware.logger);
    server.use(middleware.session(config, db.connection));
    server.use(...middleware.flash);
    //server.use(pages); 

    process.on('SIGTERM', () => {
        console.info('SIGTERM signal received.');
        console.log('Closing http server.');

        server.close(() => {
            console.log('Http server closed.');
            process.exit(0);
        });
    });

    return {
        use(...args) {
            server.use(...args);
            return this;
        },
        listen(port, ...rest) {
            if (options) {
                https.createServer(options, server)
                    .listen(port, config.APP_DOMAIN, ...rest);
            } else {
                server.listen(port, ...rest);
            }
        }
    };
};