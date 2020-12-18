const MailJet = require('./lib/mailjet');
const Zoom = require('./lib/zoom');
const Twilio = require('./lib/twilio');
const models = require('./models');
const services = require('./services');

module.exports = config => {
    const mailjet = MailJet(config);
    const twilio = Twilio(config);
    const zoom = Zoom(config);

    const lib = {
        mailjet,
        twilio,
        zoom
    };

    return {
        lib,
        models,
        services: services(config, lib, models)
    };
};