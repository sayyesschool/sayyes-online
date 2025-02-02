export default ({
    config,
    clients: { mail }
}) => ({
    defaultFrom: {
        email: `admin@${config.EMAIL_DOMAIN}`,
        name: 'SAY YES English School'
    },

    async send(arg) {
        const messages = Array.isArray(arg) ? arg : [arg];

        return mail.send(messages.map(m => ({
            ...m,
            from: m.from || this.defaultFrom
        })));
    }
});