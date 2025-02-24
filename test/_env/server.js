import express, { json } from 'express';

import App from 'server/app';
import { flash, session } from 'server/middleware';

import { config, db, models } from './context';
import { USER } from './data';

export { App };

export async function user(req, res, next) {
    req.user = await models.User.findById(USER.id);
    next();
}

export default (...modules) => {
    const server = express();

    server.set('view engine', 'pug');

    Object.assign(server.locals, config, {
        basedir: config.APP_PATH
    });

    server.use(json());
    server.use(session(config, db.connection));
    server.use(...flash);
    server.use(...modules);

    return server;
};