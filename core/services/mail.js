'use strict';

const Mailjet = require('node-mailjet');
const { MAILJET_API_KEY, MAILJET_API_SECRET } = require('../config');

const mailjet = Mailjet.connect(MAILJET_API_KEY, MAILJET_API_SECRET);

const FROM = {
    email: 'online@sayes.ru',
    name: 'SAY YES Online'
};

module.exports = {
    send({ from = FROM, to, subject, text, html, templateId, variables }) {
        return mailjet
            .post('send', { 'version': 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: from.email,
                            Name: from.name
                        },
                        To: to.map(({ name: Name, email: Email }) => ({ Name, Email })),
                        Subject: subject,
                        TextPart: text,
                        HTMLPart: html,
                        TemplateID: templateId,
                        TemplateLanguage: true,
                        Variables: variables
                    }
                ]
            });
    },

    sendMany(messages) {
        return mailjet
            .post('send', { 'version': 'v3.1' })
            .request({
                Messages: messages.map(message => ({
                    From: {
                        Email: FROM.email,
                        Name: FROM.name
                    },
                    To: message.to.map(({ name: Name, email: Email }) => ({ Name, Email })),
                    Subject: message.subject,
                    TextPart: message.text,
                    HTMLPart: message.html,
                    TemplateID: message.templateId,
                    TemplateLanguage: true,
                    Variables: message.variables
                }))
            });
    }
};