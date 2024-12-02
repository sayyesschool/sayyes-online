import express, { json } from 'express';

import { USER } from './data';

const server = express()
    .use(json())
    .use((req, res, next) => {
        req.app.user = USER;
        req.user = USER;
        next();
    });

export default server;