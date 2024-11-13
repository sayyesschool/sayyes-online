const FROM = {
    email: 'online@sayyes.school',
    name: 'SAY YES English School'
};

export default mailClient => ({
    send({ from = FROM, to, subject, text, html, templateId, variables }) {
        return mailClient
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
        if (messages.length === 0)
            return Promise.resolve();

        return mailClient
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