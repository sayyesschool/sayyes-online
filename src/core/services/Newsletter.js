const LIST_ID = 10477504;

export default ({
    clients: { newsletter }
}) => ({
    async subscribe({ name, email, action = 'addforce' }) {
        return newsletter.subscribe({ name, email, action }, LIST_ID);
    },

    async unsubscribe(email) {
        return newsletter.unsubscribe(email, LIST_ID);
    }
});