import express, { json } from 'express';

import { flash, session } from 'server/middleware';

import { config, db, models } from './context';
import { USER } from './data';

export async function user(req, res, next) {
    req.user = await models.User.findById(USER.id);
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