import { middleware as authMiddleware } from './auth';
import config from './config';
import core from './core';
import db from './db';

const { clients, models, services } = core(config);

export default {
    db: db(config),
    config,
    clients,
    models,
    services,
    middleware: {
        ...authMiddleware({ config, models })
    }
};