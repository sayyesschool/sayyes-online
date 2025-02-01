import { middleware as authMiddleware } from './auth';
import config from './config';
import core from './core';

const { clients, models, services } = core(config);

export default {
    config,
    clients,
    models,
    services,
    middleware: {
        ...authMiddleware({ config, models })
    }
};