const MailJet = require('./lib/mailjet');
const Zoom = require('./lib/zoom');
const Twilio = require('./lib/twilio');
const models = require('./models');
const services = require('./services');

module.exports = (config, shared) => {
    const mailjet = MailJet(config);
    const twilio = Twilio(config);
    const zoom = Zoom(config);

    const libs = {
        mailjet,
        twilio,
        zoom
    };

    return {
        libs,
        models,
        services: services(config, libs, models)
    };
};