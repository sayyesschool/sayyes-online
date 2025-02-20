import Mailjet from 'node-mailjet';

const API_VERSION = 'v3';

export default ({
    MAILJET_API_KEY: apiKey,
    MAILJET_API_SECRET: apiSecret
}) => {
    const client = new Mailjet({ apiKey, apiSecret });

    return {
        async subscribe({ name, email, action = 'addforce' }, listId) {
            return client
                .post('contactslist', { version: API_VERSION })
                .id(listId)
                .action('managecontact')
                .request({
                    Action: action,
                    Name: name,
                    Email: email
                })
                .then(result => result.body)
                .catch(console.error);
        },

        async unsubscribe(email, listId) {
            return client
                .post('contactslist', { version: API_VERSION })
                .id(listId)
                .action('managecontact')
                .request({
                    Action: 'unsub',
                    Email: email
                })
                .then(result => result.body)
                .catch(console.error);
        }
    };
};