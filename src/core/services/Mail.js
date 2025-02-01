export default ({
    config,
    clients: { mail }
}) => ({
    defaultFrom: {
        email: `info@${config.EMAIL_DOMAIN}`,
        name: 'SAY YES English School'
    },

    async send(...messages) {
        return mail.send(messages.map(m => ({
            ...m,
            from: m.from || this.defaultFrom
        })));
    }
});