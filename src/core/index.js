import Libs from './libs';
import Models from './models';
import Services from './services';

export default config => {
    const libs = Libs(config);
    const models = Models(config);
    const services = Services(config, libs, models);

    return {
        config,
        libs,
        models,
        services
    };
};