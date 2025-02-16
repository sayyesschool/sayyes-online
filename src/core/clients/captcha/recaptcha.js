export default ({ RECAPTCHA_SECRET_KEY }) => ({
    async verify(token) {
        if (!token) {
            throw new Error('Не указан токен');
        }

        return fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`, {
            method: 'POST'
        }).then(res => res.json());
    }
});