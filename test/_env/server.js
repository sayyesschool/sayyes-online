import express, { json } from 'express';

import { flash, session } from 'server/middleware';

import { config, db } from './context';
import { USER } from './data';

export function user(req, res, next) {
    req.app.user = USER;
    req.user = USER;
    next();
}

const server = express();

server.set('view engine', 'pug');

Object.assign(server.locals, config, {
    basedir: config.APP_PATH
});

server.use(json());
server.use(session(config, db.connection));
server.use(...flash);

export default server;