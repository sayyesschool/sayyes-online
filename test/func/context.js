import config from '@/config';
import core from '@/core';

const { models, services } = core(config);

const context = {
    models,
    services
};

export {
    context as default,
    models,
    services
};