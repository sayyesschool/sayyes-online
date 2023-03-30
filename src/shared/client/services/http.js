export function request(url, { headers = {}, body, ...rest } = {}) {
    const isJSON = (typeof body === 'object') && !(body instanceof FormData);
    const options = {
        credentials: 'same-origin',
        headers: {
            'CSRF-Token': window.CSRF_TOKEN,
            'X-Requested-With': 'XMLHttpRequest',
            ...headers,
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
    get: (url = '', options) => {
        return request(url, options);
    },

    post: (url, body, options) => {
        return request(url, {
            method: 'POST',
            body,
            ...options
        });
    },

    put: (url, body, options) => {
        return request(url, {
            method: 'PUT',
            body,
            ...options
        });
    },

    patch: (url, body, options) => {
        return request(url, {
            method: 'PATCH',
            body,
            ...options
        });
    },

    delete: (url, options) => {
        return request(url, {
            method: 'DELETE',
            ...options
        });
    }
};