import { Middleware as AuthMiddleware } from '@/auth';
import config from '@/config';
import Core from '@/core';

const core = Core(config);
const auth = AuthMiddleware(core);
const { libs, models, services } = core;

const context = {
    config,
    libs,
    models,
    services,
    middleware: {
        auth
    }
};

export {
    context as default,
    models,
    services
};