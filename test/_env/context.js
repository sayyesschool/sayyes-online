import config from 'config';
import setupModels from 'core/models';
import setupServices from 'core/services';
import setupDb from 'db';

import { middleware as authMiddleware } from 'auth';

import { captcha, checkout, hh, mail, storage, teams, zoom } from 'test/_mocks';

export const db = setupDb(config);

export const clients = {
    captcha,
    checkout,
    hh,
    mail,
    storage,
    teams,
    zoom
};

export const models = setupModels(config);

export const services = setupServices(config, clients, models);

export { config };

export default {
    db,
    config,
    clients,
    models,
    services,
    middleware: {
        ...authMiddleware({ config, models })
    }
};