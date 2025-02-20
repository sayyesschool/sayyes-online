export default () => ({
    async verify(response) {
        return fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            body: JSON.stringify({
                secret: '6Lf22BgTAAAAACnRULGoRP6Di_PU3vLjWTubsiTT',
                response
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    return Promise.resolve();
                }

                return Promise.reject(new Error('Invalid captcha'));
            });
    }
});