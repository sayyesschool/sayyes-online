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

const headers = {
    'CSRF-Token': window.CSRF_TOKEN,
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
};

const api = {
    get: (url = '') => {
        return fetch(url, {
            credentials: 'same-origin'
        })
            .then(handleFetchResponse)
            .then(handleApiResponse);
    },

    post: (url, data) => {
        return fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers,
            body: JSON.stringify(data)
        })
            .then(handleFetchResponse)
            .then(handleApiResponse);
    },

    put: (url, data) => {
        return fetch(url, {
            method: 'PUT',
            headers,
            credentials: 'same-origin',
            body: JSON.stringify(data)
        })
            .then(handleFetchResponse)
            .then(handleApiResponse);
    },

    patch: (url, data) => {
        return fetch(url, {
            method: 'PATCH',
            headers,
            credentials: 'same-origin',
            body: JSON.stringify(data)
        })
            .then(handleFetchResponse)
            .then(handleApiResponse);
    },

    delete: (url) => {
        return fetch(url, {
            method: 'DELETE',
            headers,
            credentials: 'same-origin'
        })
            .then(handleFetchResponse)
            .then(handleApiResponse);
    }
};

export default api;