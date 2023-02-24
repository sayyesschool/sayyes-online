module.exports = MailJet => ({
    subscribe: ({ name, email, action = 'addforce' }) => {
        return MailJet
            .post('contactslist', { version: 'v3' })
            .id('18064')
            .action('managecontact')
            .request({
                Action: action,
                Name: name,
                Email: email
            })
            .then(result => result.body)
            .catch(console.error);
    },

    unsubscribe: email => {
        return MailJet
            .post('contactslist', { version: 'v3' })
            .id('18064')
            .action('managecontact')
            .request({
                Action: 'unsub',
                Email: email
            })
            .then(result => result.body)
            .catch(console.error);
    }
});