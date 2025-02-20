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

        if (messages.length === 0) return;

        return mail.send(messages.map(m => ({
            ...m,
            from: m.from || this.defaultFrom
        })));
    }
});