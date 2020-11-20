function handleFetchResponse(response) {
    return response.json();
}

function handleApiResponse(response) {
    if (response.ok) {
        delete response.ok;
        return response;
    } else {
        throw new Error(response.error);
    }
}

function options({ headers = {}, body, ...rest } = {}) {
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

    return options;
}

const api = {
    get: (url = '') => {
        return fetch(url, options())
            .then(handleFetchResponse)
            .then(handleApiResponse);
    },

    post: (url, body) => {
        return fetch(url, options({
            method: 'POST',
            body
        }))
            .then(handleFetchResponse)
            .then(handleApiResponse);
    },

    put: (url, body) => {
        return fetch(url, options({
            method: 'PUT',
            body
        }))
            .then(handleFetchResponse)
            .then(handleApiResponse);
    },

    patch: (url, body) => {
        return fetch(url, options({
            method: 'PATCH',
            body
        }))
            .then(handleFetchResponse)
            .then(handleApiResponse);
    },

    delete: (url) => {
        return fetch(url, options({
            method: 'DELETE'
        }))
            .then(handleFetchResponse)
            .then(handleApiResponse);
    }
};

export default api;