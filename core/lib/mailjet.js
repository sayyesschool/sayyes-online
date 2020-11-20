const Mailjet = require('node-mailjet');
const { MAILJET_API_KEY, MAILJET_API_SECRET } = require('../config');

module.exports = Mailjet.connect(MAILJET_API_KEY, MAILJET_API_SECRET);