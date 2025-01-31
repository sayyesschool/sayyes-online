import { createServer } from 'node:https';

import cors from 'cors';
import express from 'express';

import { flash, logger, session } from './middleware';

export * as middleware from './middleware';

export default ({ config, db }, options) => {
    const server = express();

    server.set('trust proxy', true);
    server.set('view engine', 'pug');
    server.set('views', config.APP_PATH);

    server.locals.ENV = server.get('env');
    server.locals.basedir = config.APP_PATH;
    Object.assign(server.locals, config);

    server.use(cors({
        origin: /sayyes\.(school|dev|local)$/,
        credentials: true
    }));

    server.use(express.static('public'));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(session(config, db.connection));
    server.use(logger);
    server.use(...flash);
    //server.use(pages);

    process.on('SIGTERM', () => {
        console.log('SIGTERM signal received.');
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
        start(...args) {
            if (options) {
                createServer(options, server)
                    .listen(config.APP_PORT, config.APP_DOMAIN, ...args);
            } else {
                server.listen(config.APP_PORT, ...args);
            }

            console.log('Server started');
        }
    };
};