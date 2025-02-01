import config from 'config';
import { YooKassa } from 'core/clients/checkout';
import setupModels from 'core/models';
import setupServices from 'core/services';

import { middleware as authMiddleware } from 'auth';

import { HH, Mail, Storage, Zoom } from 'test/mocks';

export { config };

export const clients = {
    checkout: YooKassa(config),
    hh: HH,
    mail: Mail,
    storage: Storage,
    zoom: Zoom
};

export const models = setupModels(config);

export const services = setupServices(config, clients, models);

export default {
    config,
    clients,
    models,
    services,
    middleware: {
        ...authMiddleware({ config, models })
    }
};