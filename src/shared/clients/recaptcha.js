export function getRecaptcha() {
    return new Promise((resolve, reject) => {
        window.grecaptcha.ready(() => {
            return window.grecaptcha.execute(window.RECAPTCHA_KEY, { action: 'submit' })
                .then(token => fetch(window.RECAPTCHA_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify({
                        action: 'submit',
                        token
                    })
                }))
                .then(res => res.json())
                .then(resolve)
                .catch(reject);
        });
    });
}