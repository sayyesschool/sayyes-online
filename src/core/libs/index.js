const MailJet = require('./mailjet');
const Twilio = require('./twilio');
const Zoom = require('./zoom');

module.exports = config => ({
    mailjet: MailJet(config),
    twilio: Twilio(config),
    zoom: Zoom(config)
});