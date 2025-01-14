import config from 'config';
import core from 'core';

import { Middleware as AuthMiddleware } from 'auth';

const { clients, models, services } = core(config);
const auth = AuthMiddleware({ config, models });
const context = {
    config,
    clients,
    models,
    services,
    middleware: {
        auth
    }
};

export {
    clients,
    config,
    context as default,
    models,
    services
};