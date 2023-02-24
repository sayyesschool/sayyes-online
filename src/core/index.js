const configureLibs = require('./libs');
const configureModels = require('./models');
const configureServices = require('./services');

module.exports = (config) => {
    const libs = configureLibs(config);
    const models = configureModels();
    const services = configureServices(config, libs, models);

    return {
        libs,
        models,
        services
    };
};