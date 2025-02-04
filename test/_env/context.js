import config from 'config';
import setupModels from 'core/models';
import setupServices from 'core/services';

import { middleware as authMiddleware } from 'auth';

import { checkout, hh, mail, storage, teams, zoom } from 'test/_mocks';

export { config };

export const clients = {
    checkout,
    hh,
    mail,
    storage,
    teams,
    zoom
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