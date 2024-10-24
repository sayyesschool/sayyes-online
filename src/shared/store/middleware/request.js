export default (httpClient, baseUrl) => store => next => action => {
    if (!action.request) return next(action);

    const [
        REQUEST = `${action.type}_REQUEST`,
        SUCCESS = action.type,
        FAILURE = `${action.type}_FAILURE`
    ] = action.types || [];

    next({
        ...action,
        type: REQUEST,
        request: undefined
    });

    const promise = typeof request === 'function' ?
        action.request(httpClient, store) :
        sendRequest(httpClient, baseUrl, action.request);

    return promise
        .then(data => {
            next({
                type: SUCCESS,
                ...data
            });

            return data;
        })
        .catch(error => {
            next({
                type: FAILURE,
                error
            });

            return Promise.reject(error);
        });
};

function sendRequest(httpClient, baseUrl, request) {
    const { method, path, query = '', body } = request;
    const url = getRequestUrl(baseUrl, path, query);

    return httpClient[method](url, body);
}

function getRequestUrl(baseUrl, path, query) {
    const qs = new URLSearchParams(query).toString();

    return (path.startsWith('http') || path.startsWith('/') ? path : `${baseUrl}/${path}`) + (qs ? `?${qs}` : '');
}