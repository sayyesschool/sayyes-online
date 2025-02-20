import Mailjet from 'node-mailjet';

const API_VERSION = 'v3.1';

export default ({
    MAILJET_API_KEY: apiKey,
    MAILJET_API_SECRET: apiSecret
}) => {
    const client = new Mailjet({ apiKey, apiSecret });

    return {
        async send(messages) {
            return client
                .post('send', { version: API_VERSION })
                .request({
                    Messages: messages.map(({
                        from,
                        to,
                        subject,
                        text,
                        html,
                        templateId,
                        variables,
                        attachments
                    }) => ({
                        From: {
                            Email: from.email,
                            Name: from.name
                        },
                        To: resolveTo(to).map(({ name, email }) => ({
                            Name: name,
                            Email: email
                        })),
                        Subject: subject,
                        TextPart: text,
                        HTMLPart: html,
                        TemplateID: templateId,
                        TemplateLanguage: !!variables,
                        Variables: variables,
                        Attachments: attachments
                    }))
                })
                .then(data => data.response.data)
                .catch(console.error);
        }
    };
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