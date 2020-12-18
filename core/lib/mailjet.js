const Mailjet = require('node-mailjet');

module.exports = ({ MAILJET_API_KEY, MAILJET_API_SECRET }) => Mailjet.connect(MAILJET_API_KEY, MAILJET_API_SECRET);