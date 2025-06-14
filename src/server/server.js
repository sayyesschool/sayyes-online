import { readFileSync } from 'node:fs';
import { createServer } from 'node:https';

import cors from 'cors';
import express from 'express';
import vhost from 'vhost';

import App from './app';
import { flash, logger, session } from './middleware';

export default context => {
    const server = express();
    const { config, db } = context;

    server.set('trust proxy', true);
    server.set('view engine', 'pug');
    server.set('views', config.APP_PATH);

    Object.assign(server.locals, config, {
        basedir: config.APP_PATH,
        ENV: server.get('env'),
        YEAR: new Date().getFullYear()
    });

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

    process.on('SIGTERM', () => {
        console.log('SIGTERM signal received.');
        console.log('Closing http server.');

        server.close(() => {
            console.log('Http server closed.');
            process.exit(0);
        });
    });

    return {
        add(name, mod) {
            server.use(vhost(`${name}.${config.APP_DOMAIN}`, App(name, context, mod)));

            return this;
        },

        use(...args) {
            server.use(...args);

            return this;
        },

        start(...args) {
            db.connect();

            if (config.APP_ENV === 'local') {
                const options = {
                    cert: readFileSync(config.SSL_CERT_PATH),
                    key: readFileSync(config.SSL_KEY_PATH)
                };

                createServer(options, server)
                    .listen(config.APP_PORT, config.APP_DOMAIN, ...args);
            } else {
                server.listen(config.APP_PORT, ...args);
            }

            console.log('Server started');
        }
    };
};