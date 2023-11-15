const request = require('request');

module.exports = {
    verify(response) {
        return new Promise((resolve, reject) => {
            request({
                uri: 'https://www.google.com/recaptcha/api/siteverify',
                method: 'POST',
                form: {
                    secret: '6Lf22BgTAAAAACnRULGoRP6Di_PU3vLjWTubsiTT',
                    response
                }
            }, (error, response, body) => {
                if (error) return reject(error);

                let result = '';

                try {
                    result = JSON.parse(body);
                } catch (error) {
                    return reject(error);
                }

                if (result.success) {
                    resolve();
                }
            });
        });
    }
};