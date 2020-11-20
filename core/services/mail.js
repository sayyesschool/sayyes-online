const FROM = {
    email: 'club@sayes.ru',
    name: 'Разговорный клуб SAY YES'
};

module.exports = mailjet => ({
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
            }).catch(console.error);
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
            }).catch(console.error);
    }
});