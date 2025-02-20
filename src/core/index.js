import Clients from './clients';
import Models from './models';
import Services from './services';

export default config => {
    const clients = Clients(config);
    const models = Models(config);
    const services = Services(config, clients, models);

    return {
        clients,
        models,
        services
    };
};