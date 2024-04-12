export async function request(url, { headers = {}, body, ...rest } = {}) {
    const isJSON = (typeof body === 'object') && !(body instanceof FormData);
    const options = {
        mode: 'cors',
        credentials: 'include',
        headers: {
            'CSRF-Token': window.CSRF_TOKEN,
            'X-Requested-With': 'XMLHttpRequest',
            ...headers
        },
        body,
        ...rest
    };

    if (isJSON) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(options.body);
    }

    return fetch(url, options)
        .then(response => response.json())
        .then(response => {
            if (response.ok) {
                delete response.ok;
                return response;
            } else {
                const error = new Error(response.error.message || response.error);
                error.code = response.error?.code;
                throw error;
            }
        });
}

export default {
    async get(url = '', options) {
        return request(url, options);
    },

    async post(url, body, options) {
        return request(url, {
            method: 'POST',
            body,
            ...options
        });
    },

    async put(url, body, options) {
        return request(url, {
            method: 'PUT',
            body,
            ...options
        });
    },

    async patch(url, body, options) {
        return request(url, {
            method: 'PATCH',
            body,
            ...options
        });
    },

    async delete(url, options) {
        return request(url, {
            method: 'DELETE',
            ...options
        });
    }
};