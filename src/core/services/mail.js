const FROM = {
    email: 'info@sayyes.school',
    name: 'SAY YES English School'
};

function resolveTo(to) {
    if (typeof to === 'string')
        return [{ email: to }];
    else if (Array.isArray(to))
        return to;
    else if (to && typeof to === 'object')
        return [to];
    else
        return [];
}

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
                        To: resolveTo(to).map(({ name: Name, email: Email }) => ({ Name, Email })),
                        Subject: subject,
                        TextPart: text,
                        HTMLPart: html,
                        TemplateID: templateId,
                        TemplateLanguage: true,
                        Variables: variables
                    }
                ]
            })
            .then(data => data.response.data)
            .catch(console.error);
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
                    To: resolveTo(message.to).map(({ name: Name, email: Email }) => ({ Name, Email })),
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