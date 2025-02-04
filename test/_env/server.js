import express, { json } from 'express';

import { flash, session } from 'server/middleware';

import { config } from './context';
import { USER } from './data';
import db from './db';

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